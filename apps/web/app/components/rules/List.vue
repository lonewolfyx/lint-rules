<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-7rem)]">
        <div class="space-y-1">
            <RulesListItem
                v-for="[name, rule] in rules"
                :key="name"
                :name="name"
                :description="rule.meta.docs.description"
            />
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import rulesData from '~~/data/eslint-rules.json'
import RulesListItem from '~/components/rules/ListItem.vue'

defineOptions({
    name: 'RulesList',
})

const rules = Object.entries(rulesData)
</script>
