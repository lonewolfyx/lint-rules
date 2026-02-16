import type { RuleDefinition } from '@eslint/core'
import type { ILintRules } from '@lint-rules/web/shared/types/rules'
import type { Rule } from 'eslint'
import { writeFile } from 'node:fs/promises'
import { Linter } from 'eslint'

const plugins = [
    {
        name: 'Eslint Style',
        packageName: '@stylistic/eslint-plugin',
        description: 'Stylistic Formatting for ESLint',
        url: 'https://github.com/eslint-stylistic/eslint-stylistic',
    },
    {
        name: 'eslint-plugin-functional',
        packageName: 'eslint-plugin-functional',
        description: 'An ESLint plugin to disable mutation and promote functional programming in JavaScript and TypeScript.',
        url: 'https://github.com/eslint-functional/eslint-plugin-functional',
    },
    {
        name: 'eslint-plugin-n',
        packageName: 'eslint-plugin-n',
        description: 'Additional ESLint rules for Node.js',
        url: 'https://github.com/eslint-community/eslint-plugin-n',
    },
    {
        name: 'eslint-plugin-node',
        packageName: 'eslint-plugin-node',
        description: 'Additional ESLint rules for Node.js',
        url: 'https://github.com/mysticatea/eslint-plugin-node',
    },
    {
        name: 'eslint-plugin-promise',
        packageName: 'eslint-plugin-promise',
        description: 'Enforce best practices for JavaScript promises',
        url: 'https://github.com/eslint-community/eslint-plugin-promise',
    },
    {
        name: 'eslint-plugin-testing-library',
        packageName: 'eslint-plugin-testing-library',
        description: 'ESLint plugin to follow best practices and anticipate common mistakes when writing tests with Testing Library',
        url: 'https://github.com/testing-library/eslint-plugin-testing-library',
    },
    {
        name: 'eslint-plugin-jest',
        packageName: 'eslint-plugin-jest',
        description: 'ESLint plugin for Jest',
        url: 'https://github.com/jest-community/eslint-plugin-jest',
    },
    // {
    //     name: 'eslint-plugin-tailwindcss',
    //     packageName: 'eslint-plugin-tailwindcss',
    //     description: 'ESLint plugin for Tailwind CSS usage',
    //     url: 'https://github.com/francoismassart/eslint-plugin-tailwindcss',
    // },
    {
        name: 'eslint-plugin-security',
        packageName: 'eslint-plugin-security',
        description: 'ESLint rules for Node Security',
        url: 'https://github.com/eslint-community/eslint-plugin-security',
    },
    {
        name: 'eslint-plugin-simple-import-sort',
        packageName: 'eslint-plugin-simple-import-sort',
        description: 'Easy autofixable import sorting',
        url: 'https://github.com/lydell/eslint-plugin-simple-import-sort',
    },
    {
        name: 'eslint-plugin-perfectionist',
        packageName: 'eslint-plugin-perfectionist',
        description: '☂️ ESLint plugin for sorting various data such as objects, imports, types, enums, JSX props, etc.',
        url: 'https://github.com/azat-io/eslint-plugin-perfectionist',
    },
    {
        name: 'eslint-plugin-prettier',
        packageName: 'eslint-plugin-prettier',
        description: 'ESLint plugin for Prettier formatting',
        url: 'https://github.com/prettier/eslint-plugin-prettier',
    },
    {
        name: 'eslint-plugin-vue',
        packageName: 'eslint-plugin-vue',
        description: 'Official ESLint plugin for Vue.js',
        url: 'https://github.com/vuejs/eslint-plugin-vue',
    },
    {
        name: 'eslint-plugin-unicorn',
        packageName: 'eslint-plugin-unicorn',
        description: 'More than 100 powerful ESLint rules',
        url: 'https://github.com/sindresorhus/eslint-plugin-unicorn',
    },
    {
        name: 'eslint-plugin-import',
        packageName: 'eslint-plugin-import',
        description: 'ESLint plugin with rules that help validate proper imports.',
        url: 'https://github.com/import-js/eslint-plugin-import',
    },
    {
        name: 'eslint-plugin-react',
        packageName: 'eslint-plugin-react',
        description: 'React-specific linting rules for ESLint',
        url: 'https://github.com/jsx-eslint/eslint-plugin-react',
    },
    {
        name: 'eslint-config-prettier',
        packageName: 'eslint-config-prettier',
        description: 'Turns off all rules that are unnecessary or might conflict with Prettier.',
        url: 'https://github.com/prettier/eslint-config-prettier',
    },
    {
        name: 'eslint-plugin-boundaries',
        packageName: 'eslint-plugin-boundaries',
        description: 'Eslint plugin checking architecture boundaries between elements',
        url: 'https://github.com/javierbrea/eslint-plugin-boundaries',
    },
    {
        name: 'eslint-plugin-react-native',
        packageName: 'eslint-plugin-react-native',
        description: 'React Native plugin for ESLint',
        url: 'https://github.com/Intellicode/eslint-plugin-react-native',
    },
    {
        name: 'eslint-plugin-regexp',
        packageName: 'eslint-plugin-regexp',
        description: 'ESLint plugin for finding regex mistakes and style guide violations',
        url: 'https://github.com/ota-meshi/eslint-plugin-regexp',
    },
    {
        name: 'eslint-plugin-better-tailwindcss',
        packageName: 'eslint-plugin-better-tailwindcss',
        description: 'ESLint plugin to help you write better tailwindcss by improving readability with formatting rules and enforcing best practices with linting rules',
        url: 'https://github.com/schoero/eslint-plugin-better-tailwindcss',
    },
    {
        name: 'eslint-plugin-import-x',
        packageName: 'eslint-plugin-import-x',
        description: '`eslint-plugin-import-x` is a fork of `eslint-plugin-import` that aims to provide a more performant and more lightweight version of the original plugin.',
        url: 'https://github.com/un-ts/eslint-plugin-import-x',
    },
    {
        name: 'eslint-plugin-angular',
        packageName: 'eslint-plugin-angular',
        description: 'ESLint plugin for AngularJS applications',
        url: 'https://github.com/EmmanuelDemey/eslint-plugin-angular',
    },
    {
        name: 'eslint-plugin-check-file',
        packageName: 'eslint-plugin-check-file',
        description: 'ESLint rules for consistent filename and folder. Allows you to enforce a consistent naming pattern for the filename and folder.',
        url: 'https://github.com/dukeluo/eslint-plugin-check-file',
    },
    {
        name: 'eslint-plugin-html',
        packageName: 'eslint-plugin-html',
        description: 'An ESLint plugin to extract and lint scripts from HTML files.',
        url: 'https://github.com/BenoitZugmeyer/eslint-plugin-html',
    },
    {
        name: 'eslint-plugin-import-access',
        packageName: 'eslint-plugin-import-access',
        description: 'enabling a “package-private” export that is only visible to files in the same directory.\n',
        url: 'https://github.com/uhyo/eslint-plugin-import-access',
    },
    // {
    //     name: 'eslint-config-auto',
    //     packageName: 'eslint-config-auto',
    //     description: 'Automatically configure ESLint based on project dependencies',
    //     url: 'https://github.com/davidjbradshaw/eslint-config-auto',
    // },
    {
        name: 'eslint-plugin-astro',
        packageName: 'eslint-plugin-astro',
        description: 'ESLint plugin for Astro component',
        url: 'https://github.com/ota-meshi/eslint-plugin-astro',
    },
    {
        name: 'eslint-plugin-svelte',
        packageName: 'eslint-plugin-svelte',
        description: 'ESLint plugin for Svelte using AST',
        url: 'https://github.com/sveltejs/eslint-plugin-svelte',
    },
    {
        name: 'eslint-plugin-eslint-comments',
        packageName: 'eslint-plugin-eslint-comments',
        description: 'Additional ESLint rules for directive comments of ESLint.',
        url: 'https://github.com/mysticatea/eslint-plugin-eslint-comments',
    },
    {
        name: 'eslint-plugin-playwright',
        packageName: 'eslint-plugin-playwright',
        description: 'ESLint plugin for Playwright',
        url: 'https://github.com/mskelton/eslint-plugin-playwright',
    },
    {
        name: 'eslint-plugin-command',
        packageName: 'eslint-plugin-command',
        description: 'Comment-as-command for one-off codemod with ESLint.',
        url: 'https://github.com/antfu/eslint-plugin-command',
    },
    {
        name: 'eslint-plugin-unused-imports',
        packageName: 'eslint-plugin-unused-imports',
        description: 'Package to separate no-unused-vars and no-unused-imports for eslint as well as providing an autofixer for the latter.',
        url: 'https://github.com/sweepline/eslint-plugin-unused-imports',
    },
]

async function generateEslintRules() {
    const lint = new Linter({ configType: 'eslintrc' })
    const rules = Object.fromEntries(lint.getRules()) as Record<string, Rule.RuleModule>

    await writeFile(
        './apps/web/data/eslint-schema.json',
        JSON.stringify(rules, null, 2),
        'utf-8',
    )

    const deprecatedRules = Object.fromEntries(
        Object.entries(rules).filter(([, rule]) => rule.meta?.deprecated),
    )

    await writeFile(
        './apps/web/data/eslint-deprecated-rules.json',
        JSON.stringify(deprecatedRules, null, 2),
        'utf-8',
    )

    const eslintRules = new Map<string, ILintRules>()

    const activeRules = Object.fromEntries(
        Object.entries(rules).filter(([, rule]) => !rule.meta?.deprecated).map(([name, rule]) => {
            const ruleConfig = rule as RuleDefinition
            return [name, {
                rule: name,
                description: ruleConfig.meta?.docs?.description ?? '',
                docsUrl: ruleConfig.meta?.docs?.url ?? '',
                meta: {
                    recommended: !!ruleConfig.meta?.docs?.recommended,
                    fixable: ruleConfig.meta?.fixable ?? '',
                    hasSuggestions: !!ruleConfig.meta?.hasSuggestions,
                    frozen: !!ruleConfig.meta?.docs?.frozen,
                },
            }]
        }),
    )

    eslintRules.set('Built-in ESLint Rules', {
        name: 'Built-in ESLint Rules',
        description: 'Core rules included with ESLint by defaultCore rules included with ESLint by default',
        rules: activeRules,
    })

    for (const plugin of plugins) {
        const pluginModule = await import(plugin.packageName)
        const pluginExport = pluginModule.default || pluginModule

        console.log(plugin.packageName)
        const rules = { ...pluginExport.rules }

        if (!eslintRules.has(plugin.name)) {
            eslintRules.set(plugin.name, {
                name: '',
                description: '',
                rules: {},
            })
        }

        eslintRules.set(plugin.name, {
            name: plugin.name,
            description: plugin.description ?? '',
            rules: Object.fromEntries(
                Object.entries(rules).map(([name, rule]) => {
                    const ruleConfig = rule as RuleDefinition
                    return [name, {
                        rule: name,
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
        './apps/web/data/eslint-rules.json',
        JSON.stringify(Object.fromEntries(eslintRules), null, 2),
        'utf-8',
    )
}

;(async () => {
    await generateEslintRules()
})()
