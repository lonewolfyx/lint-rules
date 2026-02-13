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
                    :class="cn(
                        'transition-colors cursor-pointer',
                        'hover:bg-background hover:[&_span]:text-indigo-800',
                        {
                            'bg-background [&_span]:text-indigo-800': navigation.target === linter,
                        },
                    )"
                    @click="triggerLint(navigation.target as TLinter)"
                >
                    <div class="flex justify-start items-center">
                        <Icon
                            :name="navigation.icon"
                            mode="svg"
                        />
                        <span class="font-medium text-sidebar-foreground/70">{{ navigation.title }}</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>

<script lang="ts" setup>
import type { TLinter } from '#shared/types/lint'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'
import { useRuleConfig } from '~/components/rules'

defineOptions({
    name: 'SiteNavMain',
})

const app = useAppConfig()

const { linter, triggerLint } = useRuleConfig()
</script>
