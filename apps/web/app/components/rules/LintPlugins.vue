<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-6rem)]">
        <div class="flex w-full flex-col gap-2">
            <div
                :class="cn(
                    'text-sm bg-secondary relative text-foreground',
                    'rounded-md',
                    'p-2 pl-6',
                    'after:absolute after:inset-y-2 after:left-2 after:w-1',
                    'after:rounded-full after:bg-violet-500',
                )"
            >
                <span class="font-medium">
                    Built-in ESLint Rules
                </span>
                <p class="text-xs text-muted-foreground font-normal truncate">
                    Core rules included with ESLint by defaultCore rules included with ESLint by default
                </p>
            </div>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesLintPlugins',
})
</script>
