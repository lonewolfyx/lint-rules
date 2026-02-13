<template>
    <div v-bind="$attrs">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { provideRulesContext } from '.'

defineOptions({
    name: 'RulesProvider',
})

provideRulesContext({
    rule: '',
})
</script>
