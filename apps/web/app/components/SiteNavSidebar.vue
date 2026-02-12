<template>
    <Sidebar v-bind="props">
        <div
            :class="cn(
                'fixed z-10 top-0 bottom-0 start-0',
                'flex flex-col items-stretch shrink-0',
                'w-(--sidebar-width)',
                'lg:in-data-[sidebar-collapsed=true]:w-(--sidebar-width-collapse)',
                'transition-[width] duration-300 overflow-hidden',
            )"
        >
            <div class="flex flex-col items-stretch shrink-0 w-(--sidebar-width)">
                <div class="space-y-3 py-4 in-data-[sidebar-collapsed=true]:w-15 px-2">
                    <div class="flex flex-col gap-2.5 in-data-[sidebar-collapsed=true]:items-center">
                        <NuxtLink class="flex items-center gap-3">
                            <img
                                alt="sss"
                                class="w-12 h-12"
                                src="/logo.svg"
                            >
                            <div
                                :class="cn(
                                    'hidden md:flex',
                                    'flex-col items-start gap-2',
                                    'md:in-data-[sidebar-collapsed=true]:hidden',
                                )"
                            >
                                <span class="text-sm font-medium text-foreground leading-none">
                                    Lint Rules
                                </span>
                                <span
                                    class="text-xs text-muted-foreground font-normal leading-none"
                                >All in One Search</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
                <div class="in-data-[sidebar-collapsed=true]:w-15">
                    s
                </div>
            </div>
        </div>
    </Sidebar>
</template>

<script lang="ts" setup>
import type { SidebarProps } from '@private/shadcn-vue/components/ui/sidebar'
import { Sidebar } from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'SiteNavSidebar',
})

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})
</script>
