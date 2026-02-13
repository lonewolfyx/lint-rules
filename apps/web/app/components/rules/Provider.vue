<template>
    <slot />
</template>

<script lang="ts" setup>
import { provideRulesContext } from '.'

defineOptions({
    name: 'RulesProvider',
})

const rule = ref<string>('')

const toggleRules = (ruleName: string) => {
    rule.value = ruleName
}

provideRulesContext({
    rule,
    toggleRules,
})
</script>
