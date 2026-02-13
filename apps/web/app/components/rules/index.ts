import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export const [useRuleConfig, provideRulesContext] = createContext<{
    rule: Ref<string>
    toggleRules: (rule: string) => void
}>('rules')
