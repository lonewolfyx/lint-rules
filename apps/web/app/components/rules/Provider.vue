<template>
    <slot />
</template>

<script lang="ts" setup>
import type { TLinter } from '#shared/types/lint'
import { provideRulesContext } from '.'

defineOptions({
    name: 'RulesProvider',
})

const rule = ref<string>('')
const toggleRules = (ruleName: string) => {
    rule.value = ruleName
}

const linter = ref<TLinter>('eslint')
const triggerLint = (lintName: TLinter) => {
    linter.value = lintName
}

const mode = ref<string>('')
const triggerLintMode = (model: string) => {
    mode.value = model
}

const searchKeyword = ref<string>('')
const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword
}

const refreshKey = ref<number>(0)
const triggerRefresh = () => {
    refreshKey.value++
}

provideRulesContext({
    linter,
    triggerLint,
    rule,
    toggleRules,
    mode,
    triggerLintMode,
    searchKeyword,
    setSearchKeyword,
    refreshKey,
    triggerRefresh,
})
</script>
