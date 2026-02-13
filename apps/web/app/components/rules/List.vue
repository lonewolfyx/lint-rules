<template>
    <ScrollArea class="overflow-hidden w-full min-h-full h-[calc(100vh-7rem)]">
        <div class="space-y-1">
            <RulesListItem
                v-for="item in Array.from({ length: 200 }, (_, i) => i + 1)"
                :key="item"
            />
        </div>
    </ScrollArea>
</template>

<script lang="ts" setup>
import { ScrollArea } from '@private/shadcn-vue/components/ui/scroll-area'
import RulesListItem from '~/components/rules/ListItem.vue'

defineOptions({
    name: 'RulesList',
})
</script>
