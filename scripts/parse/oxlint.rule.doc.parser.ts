import { marked } from 'marked'

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
                let text = token.text.trim()

                // 去除常见的 markdown 加粗，如 **type:** → type:
                text = text.replace(/\*\*(.+?):\*\*/g, '$1:').replace(/\*\*/g, '')

                if (text.startsWith('type:') || text.startsWith('Type:')) {
                    current.type = text.replace(/^type:/i, '').trim()
                }
                if (text.startsWith('default:') || text.startsWith('Default:')) {
                    const raw = text.replace(/^default:/i, '').trim()
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

        if (type.includes('|')) {
            // 提取 "xxx" | "yyy" 中的字符串
            const matches = type.match(/"([^"]+)"/g)
            if (matches) {
                const enumValues = matches.map(m => m.slice(1, -1))
                return {
                    type: 'string',
                    enum: enumValues,
                }
            }
            // 如果有其他 union 类型，可扩展
        }

        const simpleMap: Record<string, JSONSchema> = {
            boolean: { type: 'boolean' },
            string: { type: 'string' },
            number: { type: 'number' },
            integer: { type: 'integer' },
            object: { type: 'object' },
            array: { type: 'array' },
        }

        return simpleMap[type] || {}
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
