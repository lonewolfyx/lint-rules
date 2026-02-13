import type { INavigationItem } from '#shared/types/navigation'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineCachedEventHandler(
    async (event) => {
        const linter = getRouterParam(event, 'linter') ?? ''

        const app = useAppConfig()

        const linters = app.navigation.lint.items.map((l: INavigationItem) => l.target)

        if (!linter || !linters.includes(linter)) {
            throw createError({ statusCode: 404, message: 'No Support linter' })
        }

        const rulePath = resolve(__dirname, '../../', 'data', `${linter}-rules.json`)
        const rules = await readFile(
            rulePath,
            'utf-8',
        )

        return {
            data: JSON.parse(rules),
        }
    },
    {
        maxAge: 3600, // Cache for 1 hour 3600
        swr: true,
        getKey: (event) => {
            const linter = getRouterParam(event, 'linter') ?? ''
            return `rules:lint:${linter}`
        },
    },
)
