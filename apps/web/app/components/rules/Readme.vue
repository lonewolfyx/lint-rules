<template>
    <div>
        <p>rule readme</p>
        <p v-if="rule">
            choice rule: {{ rule }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useRuleConfig } from '.'

const { rule } = useRuleConfig()
</script>
