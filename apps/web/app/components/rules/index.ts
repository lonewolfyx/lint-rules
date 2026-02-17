import type { TLinter } from '#shared/types/lint'
import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export const [useRuleConfig, provideRulesContext] = createContext<{
    linter: Ref<TLinter>
    triggerLint: (lint: TLinter) => void
    rule: Ref<string>
    toggleRules: (rule: string) => void
    mode: Ref<string>
    triggerLintMode: (lint: string) => void
    searchKeyword: Ref<string>
    setSearchKeyword: (keyword: string) => void
    refreshKey: Ref<number>
    triggerRefresh: () => void
}>('rules')
