import { writeFile } from 'node:fs/promises'
import { Linter } from 'eslint'

const lint = new Linter({ configType: 'eslintrc' })
const rules = lint.getRules();

// export const eslintRules = Object.fromEntries(
//     Array.from(rules.entries()).map(([name, rule]) => [
//         name,
//         rule.meta.docs.description,
//     ]),
// )
(async () => {
    await writeFile(
        './data/eslint-rules.json',
        JSON.stringify(Object.fromEntries(rules), null, 2),
        'utf-8',
    )
})()
