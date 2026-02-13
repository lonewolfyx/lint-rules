<template>
    <div>
        <p>rule readme</p>
        <p v-if="rule">
            choice rule: {{ rule }}
        </p>
        <p>
            linter: {{ linter }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useRuleConfig } from '.'

const { linter, rule } = useRuleConfig()
</script>
