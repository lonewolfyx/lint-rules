import { createContext } from 'reka-ui'

export const [useRuleConfig, provideRulesContext] = createContext<{
    rule: string
}>('rules')
