<template>
    <div
        :class="cn(
            'md:hidden',
            'flex items-stretch w-full',
            'bg-background shadow-black/5',
            'border border-border rounded-xl shadow-xs',
            'mb-2',
        )"
    >
        <div class="grow flex items-center justify-between gap-2.5 p-2.5">
            <div class="flex items-center">
                <img
                    alt=""
                    class="size-8"
                    src="/logo.svg"
                >
            </div>
            <div class="flex items-center">
                <Button
                    data-sidebar="trigger"
                    data-slot="sidebar-trigger"
                    size="icon"
                    variant="ghost"
                    @click="toggleSidebar"
                >
                    <Icon
                        mode="svg"
                        name="lucide:menu"
                    />
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Button } from '@private/shadcn-vue/components/ui/button'
import { useSidebar } from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'SiteAppMobileHeader',
})

const { toggleSidebar } = useSidebar()
</script>
