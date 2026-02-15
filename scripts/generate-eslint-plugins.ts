import type { RuleDefinition } from '@eslint/core'
import { writeFile } from 'node:fs/promises'

const plugins = [
    { name: 'eslint.style', packageName: '@stylistic/eslint-plugin', description: 'Stylistic Formatting for ESLint' },
]

const generateEslintPlugins = async () => {
    const eslintPlugins = new Map<string, any>()
    for (const plugin of plugins) {
        const pluginModule = await import(plugin.packageName)
        const pluginExport = pluginModule.default || pluginModule

        console.log(plugin.packageName)
        const rules = { ...pluginExport.rules }

        if (!eslintPlugins.has(plugin.name)) {
            eslintPlugins.set(plugin.name, {})
        }

        eslintPlugins.set(plugin.name, {
            name: plugin.name,
            description: plugin.description ?? '',
            rules: Object.fromEntries(
                Object.entries(rules).map(([name, rule]) => {
                    const ruleConfig = rule as RuleDefinition
                    return [name, {
                        description: ruleConfig.meta?.docs?.description ?? '',
                        docsUrl: ruleConfig.meta?.docs?.url ?? '',
                        meta: {
                            recommended: !!ruleConfig.meta?.docs?.recommended,
                            fixable: ruleConfig.meta?.fixable ?? '',
                            hasSuggestions: !!ruleConfig.meta?.hasSuggestions,
                        },
                    }]
                }),
            ),
        })
    }

    await writeFile(
        './apps/web/data/eslint-plugin.json',
        JSON.stringify(Object.fromEntries(eslintPlugins), null, 2),
    )
}

generateEslintPlugins()
    .then(() => {
    })
