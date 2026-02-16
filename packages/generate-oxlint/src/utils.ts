import { writeFile } from 'node:fs/promises'

export const writeRules = async (path: string, content: string) => {
    await writeFile(path, content, 'utf-8')
}

export const cleanText = (text: string) =>
    text.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
