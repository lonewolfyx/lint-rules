<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <SiteNavHeader />
        </SidebarHeader>
        <SidebarContent>
            <SiteNavMain />
        </SidebarContent>
        <SidebarFooter>
            <div
                :class="cn(
                    'flex group-data-[collapsible=icon]:flex-col',
                    'justify-between items-center',
                    'transition duration-300',
                )"
            >
                <Button
                    as-child
                    variant="ghost"
                >
                    <NuxtLink
                        :to="app.github.repo"
                        target="_blank"
                    >
                        <Icon
                            mode="svg"
                            name="lucide:github"
                        />
                    </NuxtLink>
                </Button>
                <ModeSwitcher />
            </div>
        </SidebarFooter>
    </Sidebar>
</template>

<script lang="ts" setup>
import type { SidebarProps } from '@private/shadcn-vue/components/ui/sidebar'
import { Button } from '@private/shadcn-vue/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'SiteAppSidebar',
})

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})

const app = useAppConfig()
</script>
