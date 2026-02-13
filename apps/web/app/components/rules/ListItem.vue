<template>
    <div
        :class="cn(
            'group flex items-center',
            'gap-2.5 p-2',
            'rounded-lg cursor-pointer',
            'relative transition-colors',
            'hover:bg-secondary',
        )"
    >
        <div class="flex-1 space-y-0.5 min-w-0">
            <div class="flex items-center">
                <span
                    :class="cn(
                        'font-medium text-sm',
                        'text-indigo-800 dark:text-foreground',
                    )"
                >accessor-pairs</span>
            </div>
            <p class="text-xs text-muted-foreground font-normal truncate">
                Enforce getter and setter pairs in objects and classes
            </p>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-xs text-secondary-foreground mb-5 disabled">✅</span>
            <span class="text-xs text-secondary-foreground mb-5">🔧</span>
            <span class="text-xs text-secondary-foreground mb-5">💡</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesListItem',
})
</script>
