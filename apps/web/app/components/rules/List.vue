<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-3rem)]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:me-4">
            <template v-if="pending">
                <div class="col-span-full flex justify-center items-center py-8">
                    <span>Loading...</span>
                </div>
            </template>
            <template v-else-if="rules?.data.rules">
                <RulesListItem
                    v-for="(rule, key) in rules?.data.rules"
                    :key="key"
                    :rule="rule"
                />
            </template>
            <template v-else>
                <div class="col-span-full flex justify-center items-center py-8">
                    No rules found
                </div>
            </template>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import type { ILintRules } from '#shared/types/rules'
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import { useRuleConfig } from '.'

defineOptions({
    name: 'RulesList',
})

const { linter, lintConfig: mode } = useRuleConfig()

const { data: rules, pending } = useAsyncData<{ data: ILintRules }>(
    `rules-${linter.value}-${mode.value}`,
    () =>
        $fetch(`/api/rule/list/${linter.value}`, {
            method: 'POST',
            body: {
                mode: mode.value,
            },
        }),
    {
        watch: [mode],
        immediate: true,
    },
)
</script>
