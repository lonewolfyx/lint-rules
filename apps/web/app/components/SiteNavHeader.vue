<script lang="ts" setup>
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@private/shadcn-vue/components/ui/sidebar'

defineOptions({
    name: 'SiteNavHeader',
})
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg"
            >
                <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
                >
                    <img
                        alt=""
                        class="size-8"
                        src="/logo.svg"
                    >
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight gap-1.5">
                    <span class="truncate text-sm font-medium text-foreground leading-none">
                        Lint Rules
                    </span>
                    <span class="truncate text-xs text-muted-foreground font-normal leading-none">All In One Search</span>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
