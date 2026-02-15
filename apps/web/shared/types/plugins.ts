export interface IPluginRules {
    description: string
    docsUrl: string
    meta: {
        recommended: boolean
        fixable: string
        hasSuggestions: boolean
    }
}

export interface IPlugins {
    name: string
    description: string
    rules: Record<string, IPluginRules>
}

export type eslintPlugins = Record<string, IPlugins>
