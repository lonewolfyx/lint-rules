import type { TLinter } from '#shared/types/lint'
import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export const [useRuleConfig, provideRulesContext] = createContext<{
    linter: Ref<TLinter>
    triggerLint: (lint: TLinter) => void
    rule: Ref<string>
    toggleRules: (rule: string) => void
}>('rules')
