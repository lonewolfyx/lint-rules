export interface IRule {
    rule: string
    description: string
    docs_url: string
    meta: {
        recommended: boolean
        fixable: string
        suggestions: boolean
        frozen: boolean
    }
}

export type Rule = Record<string, IRule>

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

export interface IEslintRules {
    name: string
    description: string
    rules: Record<string, IRulesReference>
}

export type IEslintRulesConfig = Record<string, IEslintRules>

export interface ILintRulesData {
    name: string
    description: string
    rules: number
}
