export interface IRulesReference {
    rule: string
    description: string
    docsUrl: string
    meta: {
        recommended: boolean
        fixable: string
        hasSuggestions: boolean
        frozen?: boolean
    }
}

export interface ILintRules {
    name: string
    description: string
    rules: Record<string, IRulesReference>
}

export type ILintRulesConfig = Record<string, ILintRules>

export interface ILintRulesData {
    name: string
    description: string
    rules: number
}
