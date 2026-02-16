import type { ILintRules, ILintRulesConfig, ILintRulesData } from '#shared/types/rules'
import type { H3Event } from 'h3'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function getLintRuleList(event: H3Event) {
    const linter = getRouterParam(event, 'linter') ?? 'eslint'

    const storage = useStorage()

    const fileName = `${linter}-rules.json`
    const rulesData = await storage.getItem<ILintRulesConfig>(`public-fs:data:${linter}-rules.json`)

    if (!rulesData) {
        throw createError({
            statusCode: 404,
            message: `${fileName} Not Found`,
        })
    }

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
