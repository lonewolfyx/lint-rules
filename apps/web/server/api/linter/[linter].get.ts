import type { ILintRules, ILintRulesConfig, ILintRulesData } from '#shared/types/rules'
import type { H3Event } from 'h3'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function getLintRuleList(event: H3Event) {
    const linter = getRouterParam(event, 'linter') ?? 'eslint'
    const rulesPath = resolve(process.cwd(), 'public/data', `${linter}-rules.json`)
    const rulesContent = await readFile(rulesPath, 'utf-8')
    const rulesData = JSON.parse(rulesContent) as ILintRulesConfig

    const result: ILintRulesData[] = Object.keys(rulesData).map((key) => {
        const plugin = rulesData[key]! as ILintRules
        return {
            name: plugin.name,
            description: plugin.description,
            rules: Object.keys(plugin.rules).length,
        }
    })

    return { data: result }
}

export default import.meta.dev
    ? defineEventHandler(getLintRuleList)
    : defineCachedEventHandler(getLintRuleList, {
            maxAge: 3600,
            swr: true,
            getKey: () => 'rules:plugins',
        })
