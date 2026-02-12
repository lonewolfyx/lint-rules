<template>
    <SiteBody>
        <SidebarProvider>
            <SiteAppSidebar />
            <SiteAppContent />
        </SidebarProvider>
    </SiteBody>
</template>

<script lang="ts" setup>
import { SidebarProvider } from '@private/shadcn-vue/components/ui/sidebar'
</script>
