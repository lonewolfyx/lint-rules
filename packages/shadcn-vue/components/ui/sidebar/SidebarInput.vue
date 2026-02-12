<template>
    <Input
        data-slot="sidebar-input"
        data-sidebar="input"
        :class="cn(
            'bg-background h-8 w-full shadow-none',
            props.class,
        )"
    >
        <slot />
    </Input>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '@private/shadcn-vue/components/ui/input'
import { cn } from '@private/shadcn-vue/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>
