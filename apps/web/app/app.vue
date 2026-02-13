<template>
    <SiteBody>
        <SidebarProvider>
            <RulesProvider>
                <SiteAppSidebar />
                <SiteAppContent />
            </RulesProvider>
        </SidebarProvider>
    </SiteBody>
</template>

<script lang="ts" setup>
import { SidebarProvider } from '@private/shadcn-vue/components/ui/sidebar'

const { title, description } = useAppConfig()

useSeoMeta({
    title,
    description,
})
</script>
