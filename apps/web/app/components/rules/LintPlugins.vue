<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-6rem)]">
        <div class="space-y-3">
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
            <div
                v-for="item in plugins"
                :key="item.plugin"
                :class="cn(
                    'text-sm bg-secondary relative text-foreground',
                    'rounded-md',
                    'p-2 pl-6',
                    'after:absolute after:inset-y-2 after:left-2 after:w-1',
                    'after:rounded-full after:bg-violet-500',
                )"
            >
                <span class="font-medium">
                    {{ item.plugin }}
                </span>
                <p class="text-xs text-muted-foreground font-normal truncate">
                    {{ item.description }} ({{ item.rules }} rules)
                </p>
            </div>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import type { IPluginInfo } from '#shared/types/plugins'
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesLintPlugins',
})

const { data } = useLazyAsyncData('plugins', () => $fetch<{ data: IPluginInfo[] }>('/api/rule/plugins'))
const plugins = computed(() => (data.value?.data ?? []).sort((a, b) => b.rules - a.rules))
</script>
