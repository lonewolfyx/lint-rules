import type { eslintPlugins, IPluginInfo, IPlugins } from '#shared/types/plugins'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function getPlugins() {
    const pluginPath = resolve(__dirname, '../../', 'data', 'eslint-plugin.json')
    const pluginContent = await readFile(pluginPath, 'utf-8')
    const pluginData = JSON.parse(pluginContent) as eslintPlugins

    const result: IPluginInfo[] = Object.keys(pluginData).map((key) => {
        const plugin = pluginData[key]! as IPlugins
        return {
            plugin: plugin.name,
            description: plugin.description,
            rules: Object.keys(plugin.rules).length,
        }
    })

    return { data: result }
}

export default import.meta.dev
    ? defineEventHandler(getPlugins)
    : defineCachedEventHandler(getPlugins, {
            maxAge: 3600,
            swr: true,
            getKey: () => 'rules:plugins',
        })
