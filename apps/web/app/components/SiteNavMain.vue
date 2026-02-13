<template>
    <SidebarGroup
        v-for="nav in app.navigation"
        :key="nav.label"
    >
        <SidebarGroupLabel>{{ nav.label }}</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem
                v-for="navigation in nav.items"
                :key="navigation.title"
            >
                <SidebarMenuButton
                    :tooltip="navigation.title"
                    as-child
                >
                    <NuxtLink
                        target="_blank"
                        to="#"
                    >
                        <Icon
                            :name="navigation.icon"
                            mode="svg"
                        />
                        <span class="text-sidebar-foreground/70">{{ navigation.title }}</span>
                    </NuxtLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>

<script lang="ts" setup>
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@private/shadcn-vue/components/ui/sidebar'

defineOptions({
    name: 'SiteNavMain',
})

const app = useAppConfig()
</script>
