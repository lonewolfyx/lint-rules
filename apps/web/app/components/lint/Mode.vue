<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-6rem)]">
        <div
            v-if="pending"
            class="flex items-center justify-center"
        >
            <span>loading</span>
        </div>
        <div
            v-else
            class="space-y-3"
        >
            <div
                v-for="lint in lintRules"
                :key="lint.name"
                class="flex w-full flex-col gap-2 cursor-pointer"
                @click="triggerLintMode(lint.name)"
            >
                <div
                    :class="cn(
                        'text-sm relative text-foreground',
                        'rounded-md',
                        'p-2 pl-6',
                        'after:absolute after:inset-y-2 after:left-2 after:w-1',
                        'after:rounded-full after:bg-violet-500',
                        'hover:bg-secondary transition duration-300',
                        {
                            'bg-secondary': lint.name === mode,
                        },
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
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import { cn } from '@private/shadcn-vue/lib/utils'
import { useRuleConfig } from '~/components/rules'

defineOptions({
    name: 'LintMode',
})

const { linter, mode, triggerLintMode } = useRuleConfig()

const { data, pending } = useAsyncData(
    `lintRules-${linter.value}`,
    () => $fetch(`/api/linter/${linter.value}`),
    {
        watch: [linter],
        immediate: true,
    },
)

const lintRules = computed(() => data.value?.data ?? [])

onMounted(() => {
    if (lintRules.value.length > 0) {
        triggerLintMode(lintRules.value.at(0)?.name as string)
    }
})
</script>
