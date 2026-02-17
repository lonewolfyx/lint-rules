import type { INavigationItem } from '#shared/types/navigation'
import type { ILintRules, ILintRulesConfig } from '#shared/types/rules'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const linter = getRouterParam(event, 'linter') ?? ''
    const mode = body?.mode ?? ''

    const app = useAppConfig()

    const linters = app.navigation.lint.items.map((l: INavigationItem) => l.target)

    if (!linter || !linters.includes(linter)) {
        throw createError({ statusCode: 404, message: 'No Support linter' })
    }

    if (!mode) {
        throw createError({ statusCode: 400, message: 'mode is required' })
    }

    const cacheKey = `cache:rules:${linter}:${mode}`
    const cacheStorage = useStorage('cache')

    const cachedData = await cacheStorage.getItem<ILintRules>(cacheKey)

    if (cachedData) {
        return { data: cachedData }
    }

    const storage = useStorage('assets:lint-rules')
    const fileName = `${linter}-rules.json`
    const rulesData = await storage.getItem<ILintRulesConfig>(`${fileName}`)

    if (!rulesData) {
        throw createError({
            statusCode: 404,
            message: `${fileName} Not Found`,
        })
    }

    if (!rulesData[mode]) {
        throw createError({ statusCode: 404, message: `No rules found for mode: ${mode}` })
    }

    await cacheStorage.setItem(cacheKey, rulesData[mode], { ttl: 3600 })

    return {
        data: rulesData[mode],
    }
})
