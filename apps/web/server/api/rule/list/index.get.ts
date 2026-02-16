import type { IEslintRules, IEslintRulesConfig, ILintRulesData } from '#shared/types/rules'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function getLintRuleList() {
    const rulesPath = resolve(__dirname, '../../', 'data', 'eslint-rules.json')
    const rulesContent = await readFile(rulesPath, 'utf-8')
    const rulesData = JSON.parse(rulesContent) as IEslintRulesConfig

    const result: ILintRulesData[] = Object.keys(rulesData).map((key) => {
        const plugin = rulesData[key]! as IEslintRules
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
