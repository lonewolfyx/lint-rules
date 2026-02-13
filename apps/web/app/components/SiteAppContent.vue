<template>
    <SidebarInset class="py-3 me-3">
        <div class="h-screen overflow-hidden">
            <RulesProvider class="relative flex h-full gap-1 min-h-0">
                <div
                    :class="cn(
                        'bg-background',
                        'border border-input rounded-xl shadow-xs',
                        'w-full lg:w-md',
                        'shrink-0',
                    )"
                >
                    <div class="flex items-center justify-between px-2 py-3 gap-1">
                        <SiteAppSidebarTrigger />
                        <div class="flex items-center flex-1 gap-1">
                            <InputGroup>
                                <InputGroupInput placeholder="Search..." />
                                <InputGroupAddon>
                                    <Icon
                                        mode="svg"
                                        name="lucide:search"
                                    />
                                </InputGroupAddon>
                            </InputGroup>
                            <Button
                                size="icon"
                                variant="ghost"
                            >
                                <Icon
                                    mode="svg"
                                    name="lucide:refresh-ccw"
                                />
                            </Button>
                        </div>
                    </div>
                    <div class="px-4 py-3">
                        <RulesList />
                    </div>
                </div>

                <div
                    class="bg-background border border-input rounded-xl shadow-xs flex-1 overflow-y-auto overscroll-none"
                >
                    <div class="px-4 py-3">
                        <p>rule readme</p>
                    </div>
                </div>
            </RulesProvider>
        </div>
    </SidebarInset>
</template>

<script lang="ts" setup>
import { Button } from '@private/shadcn-vue/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@private/shadcn-vue/components/ui/input-group'
import { SidebarInset } from '@private/shadcn-vue/components/ui/sidebar'
import { cn } from '@private/shadcn-vue/lib/utils'

defineOptions({
    name: 'SiteAppContent',
})
</script>
