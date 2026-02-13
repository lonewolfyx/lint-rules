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

provideRulesContext({
    linter,
    triggerLint,
    rule,
    toggleRules,
})
</script>
