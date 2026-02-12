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
</script>

<template>
    <SidebarGroup>
        <SidebarGroupLabel>Lint</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    as-child
                    tooltip="eslint"
                >
                    <NuxtLink
                        target="_blank"
                        to="#"
                    >
                        <Icon
                            mode="svg"
                            name="vscode-icons:file-type-eslint2"
                        />
                        <span class="text-sidebar-foreground/70">eslint</span>
                    </NuxtLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                    as-child
                    tooltip="oxlint"
                >
                    <NuxtLink
                        target="_blank"
                        to="#"
                    >
                        <Icon
                            mode="svg"
                            name="vscode-icons:file-type-oxlint"
                        />
                        <span class="text-sidebar-foreground/70">oxlint</span>
                    </NuxtLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
