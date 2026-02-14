import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { load } from 'cheerio'
import { marked } from 'marked'
import { x } from 'tinyexec'
import { TEMP_PATH } from './constant'
import { cleanText, writeRules } from './utils'

// https://oxc.rs/docs/guide/usage/linter/rules.html

interface OxlintRules {
    scope: string
    value: string
    category: string
    type_aware: boolean
    fix: string
    default: boolean
    docs_url: string
}

const ruleWebSitePath = resolve(TEMP_PATH, 'oxc-project-website')
const RULES_GLOB_DIR = join('src', 'docs', 'guide', 'usage', 'linter', 'rules')

interface JSONSchema {
    type?: string
    enum?: string[]
    items?: JSONSchema | JSONSchema[]
    properties?: Record<string, JSONSchema>
}

interface ParsedRuleDoc {
    schema: JSONSchema
    defaultOptions: any[]
}

interface ConfigNode {
    name: string
    depth: number
    type?: string
    default?: any
    children: ConfigNode[]
}

export class RuleDocParser {
    parse(markdown: string): ParsedRuleDoc {
        const tokens = marked.lexer(markdown)
        const configTokens = this.extractConfigurationSection(tokens)
        if (configTokens.length === 0) {
            return {
                schema: {},
                defaultOptions: [],
            }
        }
        const tree = this.buildConfigTree(configTokens)
        if (this.isTupleRule(tree)) {
            return this.buildTupleSchema(tree)
        }
        return this.buildObjectSchema(tree)
    }

    private extractConfigurationSection(tokens: any[]): any[] {
        const startIndex = tokens.findIndex(
            t =>
                t.type === 'heading'
                && t.depth === 2
                && t.text.trim() === 'Configuration',
        )
        if (startIndex === -1)
            return []
        const section: any[] = []
        for (let i = startIndex + 1; i < tokens.length; i++) {
            const t = tokens[i]
            if (t.type === 'heading' && t.depth === 2)
                break
            section.push(t)
        }
        return section
    }

    private buildConfigTree(tokens: any[]): ConfigNode[] {
        const stack: ConfigNode[] = []
        const roots: ConfigNode[] = []
        for (const token of tokens) {
            if (token.type === 'heading') {
                const node: ConfigNode = {
                    name: token.text.trim(),
                    depth: token.depth,
                    children: [],
                }
                while (stack.length && stack[stack.length - 1].depth >= token.depth) {
                    stack.pop()
                }
                if (stack.length === 0) {
                    roots.push(node)
                }
                else {
                    stack[stack.length - 1].children.push(node)
                }
                stack.push(node)
            }
            if (token.type === 'paragraph' && stack.length) {
                const current = stack[stack.length - 1]
                const text = token.text.trim()
                if (text.startsWith('type:')) {
                    current.type = text.replace('type:', '').trim()
                }
                if (text.startsWith('default:')) {
                    const raw = text.replace('default:', '').trim()
                    current.default = this.parseValue(raw, current.type)
                }
            }
        }
        return roots
    }

    private isTupleRule(nodes: ConfigNode[]): boolean {
        return nodes.some(n => n.name.includes('1st option'))
    }

    private buildObjectSchema(nodes: ConfigNode[]): ParsedRuleDoc {
        const properties: Record<string, JSONSchema> = {}
        const defaults: Record<string, any> = {}
        for (const node of nodes) {
            const key = node.name.trim()
            properties[key] = this.buildSchemaFromNode(node)
            const defaultValue = this.buildDefaultFromNode(node)
            if (defaultValue !== undefined) {
                defaults[key] = defaultValue
            }
        }
        return {
            schema: {
                type: 'object',
                properties,
            },
            defaultOptions: Object.keys(defaults).length ? [defaults] : [],
        }
    }

    private buildTupleSchema(nodes: ConfigNode[]): ParsedRuleDoc {
        const items: JSONSchema[] = []
        const defaults: any[] = []
        for (const node of nodes) {
            items.push(this.buildSchemaFromNode(node))
            const defaultValue = this.buildDefaultFromNode(node)
            if (defaultValue !== undefined) {
                defaults.push(defaultValue)
            }
        }
        return {
            schema: {
                type: 'array',
                items,
            },
            defaultOptions: defaults,
        }
    }

    private buildSchemaFromNode(node: ConfigNode): JSONSchema {
        if (node.children.length === 0) {
            return this.convertTypeToSchema(node.type)
        }

        if (node.type?.trim() === 'array') {
            let items: JSONSchema | JSONSchema[] = {}
            if (node.children.length > 0) {
                // Handle [n] for homogeneous array
                const itemChild = node.children.find(c => c.name === `${node.name}[n]` || c.name.endsWith('[n]'))
                if (itemChild) {
                    items = this.buildSchemaFromNode(itemChild)
                }
                else {
                    // Tuple-like array
                    items = node.children.map(child => this.buildSchemaFromNode(child))
                }
            }
            return {
                type: 'array',
                items,
            }
        }
        else {
            // Object
            const properties: Record<string, JSONSchema> = {}
            for (const child of node.children) {
                const key = child.name.split('.').pop()!.trim()
                properties[key] = this.buildSchemaFromNode(child)
            }
            return {
                type: 'object',
                properties,
            }
        }
    }

    private convertTypeToSchema(type?: string): JSONSchema {
        if (!type)
            return {}
        type = type.replace(/`/g, '').trim()
        // Union enum for strings
        if (type.includes('|')) {
            const enums = type.match(/"(.+?)"/g)?.map(v => v.replace(/"/g, '')) ?? []
            if (enums.length) {
                return {
                    type: 'string',
                    enum: enums,
                }
            }
            // For other unions, return empty for now (can extend if needed)
            return {}
        }
        if (type === 'boolean')
            return { type: 'boolean' }
        if (type === 'string')
            return { type: 'string' }
        if (type === 'number')
            return { type: 'number' }
        if (type === 'integer')
            return { type: 'integer' }
        if (type === 'object')
            return { type: 'object' }
        if (type === 'array')
            return { type: 'array' }
        return {}
    }

    private parseValue(raw: string, type?: string): any {
        if (!type)
            return raw
        raw = raw.replace(/`/g, '').trim()
        type = type.replace(/`/g, '').trim()
        if (raw.startsWith('"') && raw.endsWith('"')) {
            raw = raw.slice(1, -1)
        }
        if (type === 'boolean') {
            return raw === 'true'
        }
        if (type === 'number' || type === 'integer') {
            return Number(raw)
        }
        if (type === 'array' || type === 'object' || type.startsWith('Record<') || type === '[]' || type.endsWith('[]')) {
            try {
                return JSON.parse(raw)
            }
            catch {
                return undefined
            }
        }
        return raw === 'null' ? null : raw
    }

    private buildDefaultFromNode(node: ConfigNode): any {
        if (node.children.length > 0) {
            if (node.type?.trim() === 'array') {
                // For arrays, default is usually [], but if children have defaults, perhaps collect
                // But in examples, default is set on parent
                return node.default
            }
            else {
                const obj: any = {}
                for (const child of node.children) {
                    const key = child.name.split('.').pop()!.trim()
                    const value = this.buildDefaultFromNode(child)
                    if (value !== undefined) {
                        obj[key] = value
                    }
                }
                return Object.keys(obj).length ? obj : undefined
            }
        }
        return node.default
    }
}

async function getRuleMarkDownContent(rule: OxlintRules) {
    return await readFile(resolve(ruleWebSitePath, `${RULES_GLOB_DIR}/${rule.scope}/${rule.value}.md`), 'utf-8')
}

async function getRuleDescription(rule: OxlintRules) {
    const mdContent = await getRuleMarkDownContent(rule)
    const html = await marked(mdContent)

    const $ = load(html)

    const description = $('h3')
        .filter((_, el) => $(el).text().trim() === 'What it does')
        .nextAll('p')
        .first()
        .text()

    return cleanText(description)
}

async function generateOxlintRules() {
    const ruleCommand = await x('oxlint', ['--rules', '-f', 'json'])
    const rules = JSON.parse(ruleCommand.stdout.trim()) as OxlintRules[]

    // await downloadTemplate('github:oxc-project/website', {
    //     cwd: TEMP_PATH,
    // })
    // const TmpFolder = resolve(TEMP_PATH, 'oxc-project-website')
    const parser = new RuleDocParser()

    const data = await Promise.all(
        rules.map(async (rule: OxlintRules) => {
            const description = await getRuleDescription(rule)
            const options = parser.parse(await getRuleMarkDownContent(rule))

            console.log(`rule: ${rule.value}`)
            return {
                rule: rule.value,
                description,
                url: rule.docs_url,
                options,
            }
        }),
    )

    // await rimraf(TmpFolder)
    await writeRules(resolve(TEMP_PATH, '../apps/web/data/oxlint-rules.json'), JSON.stringify(data, null, 2))
}

(async () => {
    await generateOxlintRules()
})()
