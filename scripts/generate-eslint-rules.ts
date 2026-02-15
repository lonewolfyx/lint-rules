import type { Rule } from 'eslint'
import { writeFile } from 'node:fs/promises'
import { Linter } from 'eslint'

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

    const activeRules = Object.fromEntries(
        Object.entries(rules).filter(([, rule]) => !rule.meta?.deprecated).map(([name, rule]) => [name, {
            rule: name,
            description: rule.meta?.docs?.description ?? '',
            docs_url: rule.meta?.docs?.url ?? '',
            meta: {
                recommended: rule.meta?.docs?.recommended ?? false,
                fixable: rule.meta?.fixable ?? '',
                suggestions: rule.meta?.hasSuggestions ?? false,
                frozen: rule.meta?.docs?.frozen ?? false,
            },
        }]),
    )

    await writeFile(
        './apps/web/data/eslint-rules.json',
        JSON.stringify(activeRules, null, 2),
        'utf-8',
    )
}

;(async () => {
    await generateEslintRules()
})()
