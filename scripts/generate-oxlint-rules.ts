import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { load } from 'cheerio'
import { marked } from 'marked'
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
    const rules = JSON.parse(ruleCommand.stdout.trim()) as OxlintRules[]

    // await downloadTemplate('github:oxc-project/website', {
    //     cwd: TEMP_PATH,
    // })
    // const TmpFolder = resolve(TEMP_PATH, 'oxc-project-website')
    const parser = new RuleDocParser()

    const data = await Promise.all(
        rules.map(async (rule: OxlintRules) => {
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

    // await rimraf(TmpFolder)
    await writeRules(resolve(TEMP_PATH, '../apps/web/data/oxlint-rules.json'), JSON.stringify(data, null, 2))
}

(async () => {
    await generateOxlintRules()
})()
