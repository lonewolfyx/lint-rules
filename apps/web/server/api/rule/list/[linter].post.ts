import type { INavigationItem } from '#shared/types/navigation'
import type { ILintRulesConfig } from '#shared/types/rules'
import type { H3Event } from 'h3'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function handler(event: H3Event) {
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

    const storage = useStorage()
    const fileName = `${linter}-rules.json`
    const rulesData = await storage.getItem<ILintRulesConfig>(`public-fs:data:${linter}-rules.json`)

    if (!rulesData) {
        throw createError({
            statusCode: 404,
            message: `${fileName} Not Found`,
        })
    }

    if (!rulesData[mode]) {
        throw createError({ statusCode: 404, message: `No rules found for mode: ${mode}` })
    }

    return {
        data: rulesData[mode],
    }
}

export default import.meta.dev
    ? defineEventHandler(handler)
    : defineCachedEventHandler(handler, {
            maxAge: 3600,
            swr: true,
            getKey: (event) => {
                const linter = getRouterParam(event, 'linter') ?? ''
                return `rules:lint:${linter}`
            },
        })
