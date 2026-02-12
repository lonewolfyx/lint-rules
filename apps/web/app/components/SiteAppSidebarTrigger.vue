<template>
    <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        size="icon"
        variant="ghost"
        @click="toggleSidebar"
    >
        <ClientOnly>
            <Icon
                v-if="state === 'expanded'"
                mode="svg"
                name="lucide:panel-left-close"
            />
            <Icon
                v-else
                mode="svg"
                name="lucide:panel-left-open"
            />
        </ClientOnly>
        <span class="sr-only">Toggle Sidebar</span>
    </Button>
</template>

<script lang="ts" setup>
import { Button } from '@private/shadcn-vue/components/ui/button'
import { useSidebar } from '@private/shadcn-vue/components/ui/sidebar'

defineOptions({
    name: 'SiteAppSidebarTrigger',
})

const { toggleSidebar, state } = useSidebar()
</script>
