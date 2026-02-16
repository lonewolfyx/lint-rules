import type { RuleDefinition } from '@eslint/core'
import type { ILintRules } from '@lint-rules/web/shared/types/rules'
import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { load } from 'cheerio'
import { downloadTemplate } from 'giget'
import { marked } from 'marked'
import { rimraf } from 'rimraf'
import { x } from 'tinyexec'
import { TEMP_PATH } from './constant'
import { RuleDocParser } from './parse/oxlint.rule.doc.parser'
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

const plugins = [
    {
        name: 'typescript',
        packageName: '@typescript-eslint/eslint-plugin',
        description: '✨ Monorepo for all the tooling which enables ESLint to support TypeScript',
        url: 'https://github.com/typescript-eslint/typescript-eslint',
    },
    {
        name: 'unicorn',
        packageName: 'eslint-plugin-unicorn',
        description: 'More than 100 powerful ESLint rules',
        url: 'https://github.com/sindresorhus/eslint-plugin-unicorn',
    },
    {
        name: 'react',
        packageName: 'eslint-plugin-react',
        description: 'React-specific linting rules for ESLint',
        url: 'https://github.com/jsx-eslint/eslint-plugin-react',
    },
    {
        name: 'react-perf',
        packageName: 'eslint-plugin-react-perf',
        description: 'Performance-minded React linting rules for ESLint',
        url: 'https://github.com/cvazac/eslint-plugin-react-perf',
    },
    {
        name: 'react-hooks',
        packageName: 'eslint-plugin-react-hooks',
        description: 'This plugin helps you catch violations of React’s rules at build time, ensuring your components and hooks follow React’s rules for correctness and performance',
        url: 'https://react.dev/reference/eslint-plugin-react-hooks',
    },
    {
        name: 'next',
        packageName: '@next/eslint-plugin-next',
        description: 'Base configuration with Next.js, React, and React Hooks rules.',
        url: 'https://nextjs.org/docs/app/api-reference/config/eslint',
    },
    {
        name: 'eslint-plugin-import',
        packageName: 'eslint-plugin-import',
        description: 'ESLint plugin with rules that help validate proper imports.',
        url: 'https://github.com/import-js/eslint-plugin-import',
    },
    {
        name: 'jsdoc',
        packageName: 'eslint-plugin-jsdoc',
        description: 'JSDoc specific linting rules for ESLint.',
        url: 'https://github.com/gajus/eslint-plugin-jsdoc',
    },
    {
        name: 'eslint-plugin-jsx-a11y',
        packageName: 'eslint-plugin-jsx-a11y',
        description: 'Static AST checker for a11y rules on JSX elements.',
        url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y',
    },
    {
        name: 'node',
        packageName: 'eslint-plugin-n',
        description: 'Additional ESLint rules for Node.js',
        url: 'https://github.com/eslint-community/eslint-plugin-n',
    },
    {
        name: 'promise',
        packageName: 'eslint-plugin-promise',
        description: 'Enforce best practices for JavaScript promises',
        url: 'https://github.com/eslint-community/eslint-plugin-promise',
    },
    {
        name: 'jest',
        packageName: 'eslint-plugin-jest',
        description: 'ESLint plugin for Jest',
        url: 'https://github.com/jest-community/eslint-plugin-jest',
    },
    {
        name: 'vitest',
        packageName: 'eslint-plugin-vitest',
        description: 'eslint plugin for vitest',
        url: 'https://github.com/vitest-dev/eslint-plugin-vitest',
    },
    {
        name: 'vue',
        packageName: 'eslint-plugin-vue',
        description: 'Official ESLint plugin for Vue.js',
        url: 'https://github.com/vuejs/eslint-plugin-vue',
    },
]

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
    const activeRules = JSON.parse(ruleCommand.stdout.trim()) as OxlintRules[]

    await downloadTemplate('github:oxc-project/website', {
        cwd: TEMP_PATH,
    })
    const TmpFolder = resolve(TEMP_PATH, 'oxc-project-website')
    const parser = new RuleDocParser()

    const oxlintSchema = await Promise.all(
        activeRules.map(async (rule: OxlintRules) => {
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

    await writeRules(
        resolve(TEMP_PATH, '../apps/web/data/oxlint-schema.json'),
        JSON.stringify(oxlintSchema, null, 2),
    )

    const oxlintRules = new Map<string, ILintRules>()

    oxlintRules.set('Oxlint', {
        name: 'Oxlint',
        description: 'Oxlint is a high-performance linter for JavaScript and TypeScript built on the Oxc compiler stack.',
        rules: Object.fromEntries(oxlintSchema.map((rule) => {
            // https://github.com/oxc-project/website/blob/main/.vitepress/theme/components/utils/fixEmoji.ts
            const ruleConfig = activeRules.find(r => r.value === rule.rule)
            const fix = ruleConfig?.fix ?? ''
            return [rule.rule, {
                rule: rule.rule,
                description: rule.description,
                docsUrl: rule.url,
                meta: {
                    recommended: !!ruleConfig?.default,
                    fixable: `${['fixable_fix', 'conditional_fix'].includes(fix)}`,
                    hasSuggestions: ['fixable_fix', 'conditional_fix'].includes(fix),
                },
            }]
        })),
    })

    for (const plugin of plugins) {
        const pluginModule = await import(plugin.packageName)
        const pluginExport = pluginModule.default || pluginModule

        console.log(plugin.packageName)
        const rules = { ...pluginExport.rules }

        if (!oxlintRules.has(plugin.name)) {
            oxlintRules.set(plugin.name, {
                name: '',
                description: '',
                rules: {},
            })
        }

        oxlintRules.set(plugin.name, {
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

    // const rulesContentPath = resolve(TEMP_PATH, 'oxc-project-website/src/docs/guide/usage/linter/rules')
    // const targetPath = resolve(TEMP_PATH, '../apps/web/content/oxlint/')
    // await cp(rulesContentPath, targetPath, { recursive: true })
    // console.log(`Rules content copied to ${targetPath}`)

    await rimraf(TmpFolder)

    await writeFile(
        resolve(TEMP_PATH, '../apps/web/data/oxlint-rules.json'),
        JSON.stringify(Object.fromEntries(oxlintRules), null, 2),
        'utf-8',
    )
}

(async () => {
    await generateOxlintRules()
})()
