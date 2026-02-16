<template>
    <div
        :class="cn(
            'group flex items-center',
            'gap-2.5 p-2',
            'rounded-lg cursor-pointer',
            'relative transition-colors',
            'bg-secondary',
        )"
    >
        <div class="flex-1 space-y-0.5 min-w-0">
            <div class="flex items-center">
                <span
                    :class="cn(
                        'font-medium text-sm',
                        'text-foreground hover:text-indigo-800 dark:text-foreground',
                    )"
                >{{ rule.rule }}</span>
            </div>
            <p class="text-xs text-muted-foreground font-normal truncate">
                {{ rule.description }}
            </p>
        </div>
        <div class="flex items-center gap-2">
            <span
                v-if="rule.meta.recommended"
                class="text-xs text-secondary-foreground mb-5 disabled"
            >✅</span>
            <span
                v-if="rule.meta.fixable"
                class="text-xs text-secondary-foreground mb-5"
            >🔧</span>
            <span
                v-if="rule.meta.hasSuggestions"
                class="text-xs text-secondary-foreground mb-5"
            >💡</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IRulesReference } from '#shared/types/rules'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesListItem',
})

defineProps<{
    rule: IRulesReference
}>()
</script>
