<template>
    <component
        :is="rule.docsUrl ? NuxtLink : 'div'"
        :class="cn(
            'group flex items-center',
            'gap-2.5 p-2',
            'rounded-lg cursor-pointer',
            'relative transition-colors',
            'bg-secondary',
        )"
        :to="rule.docsUrl"
        target="_blank"
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
            <TooltipProvider>
                <Tooltip v-if="rule.meta.recommended">
                    <TooltipTrigger as-child>
                        <span class="text-xs text-secondary-foreground mb-5 disabled">✅</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p class="w-xs">
                            Using the recommended config from @eslint/js in a configuration file enables this rule
                        </p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip v-if="rule.meta.fixable">
                    <TooltipTrigger as-child>
                        <span class="text-xs text-secondary-foreground mb-5">🔧</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p class="w-xs">
                            Some problems reported by this rule are automatically fixable by the --fix command line
                            option
                        </p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip v-if="rule.meta.hasSuggestions">
                    <TooltipTrigger as-child>
                        <span class="text-xs text-secondary-foreground mb-5">💡</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p class="w-xs">
                            Some problems reported by this rule are manually fixable by editor suggestions
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </component>
</template>

<script lang="ts" setup>
import type { IRulesReference } from '#shared/types/rules'
import { NuxtLink } from '#components'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@private/shadcn-vue/components/ui/tooltip'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'RulesListItem',
})

defineProps<{
    rule: IRulesReference
}>()
</script>
