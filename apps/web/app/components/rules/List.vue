<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-3rem)]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:me-4">
            <RulesListItem
                v-for="(rule, index) in rulesData as Rule"
                :key="index"
                :rule="rule"
            />
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import type { Rule } from '#shared/types/rules'
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import rulesData from '~~/data/eslint-rules.json'
import RulesListItem from '~/components/rules/ListItem.vue'

defineOptions({
    name: 'RulesList',
})
</script>
