<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-6rem)]">
        <div class="space-y-3">
            <div
                v-for="lint in lintRules"
                :key="lint.name"
                class="flex w-full flex-col gap-2"
            >
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
                        {{ lint.name }}
                    </span>
                    <p class="text-xs text-muted-foreground font-normal truncate">
                        {{ lint.description }}
                    </p>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import type { ILintRulesData } from '#shared/types/rules'
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesLintPlugins',
})

const { data } = useLazyAsyncData('plugins', () => $fetch<{ data: ILintRulesData[] }>('/api/rule/list'))
const lintRules = computed(() => data.value?.data ?? [])
</script>
