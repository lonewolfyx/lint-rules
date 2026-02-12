<script lang="ts" setup>
import { SidebarInset } from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'SiteAppContent',
})
</script>

<template>
    <SidebarInset class="py-3 me-3">
        <div class="h-screen overflow-hidden">
            <div class="relative flex h-full gap-1 min-h-0">
                <div
                    :class="cn(
                        'bg-background',
                        'border border-input rounded-xl shadow-xs',
                        'w-full lg:w-md',
                        'shrink-0 overflow-y-auto overscroll-none',
                    )"
                >
                    <div class="px-4 py-3">
                        <p>rules list</p>
                    </div>
                </div>

                <div
                    class="bg-background border border-input rounded-xl shadow-xs flex-1 overflow-y-auto overscroll-none"
                >
                    <div class="px-4 py-3">
                        <p>rule readme</p>
                    </div>
                </div>
            </div>
        </div>
    </SidebarInset>
</template>
