import { writeFile } from 'node:fs/promises'
import { x } from 'tinyexec'

const generateOxlintRules = async () => {
    const rules = await x('oxlint', ['--rules', '-f', 'json'])
    await writeFile(
        './data/oxlint-rules.json',
        rules.stdout.trim(),
        'utf-8',
    )
}

(async () => {
    await generateOxlintRules()
})()
