<template>
    <Separator
        data-slot="sidebar-separator"
        data-sidebar="separator"
        :class="cn('bg-sidebar-border mx-2 w-auto', props.class)"
    >
        <slot />
    </Separator>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator } from '@private/shadcn-vue/components/ui/separator'
import { cn } from '@private/shadcn-vue/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>
