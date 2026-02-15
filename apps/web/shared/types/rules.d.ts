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
