<script setup lang="ts">
import { computed } from 'vue'
import type { BuiltInColor } from '@/types/data'

defineOptions({ name: 'WidgetBadge' })

const props = withDefaults(
    defineProps<{
        variant?: 'filled' | 'outlined'
        color?: BuiltInColor
    }>(),
    {
        variant: 'filled',
        color: 'blue',
    }
)

const classes = computed(() => ['badge', `badge-${props.variant}`, `badge-${props.color}`])
</script>

<template>
    <span :class="classes">
        <slot />
    </span>
</template>

<style lang="less" scoped>
.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    white-space: nowrap;
}

// Filled
.badge-filled {
    color: #fff;

    &.badge-yellow {
        background-color: @wu-color-yellow-dark;
    }
    &.badge-amber {
        background-color: @wu-color-amber;
    }
    &.badge-orange {
        background-color: @wu-color-orange;
    }
    &.badge-green {
        background-color: @wu-color-green;
    }
    &.badge-teal {
        background-color: @wu-color-teal;
    }
    &.badge-blue {
        background-color: @wu-color-blue;
    }
    &.badge-purple {
        background-color: @wu-color-purple;
    }
    &.badge-gray {
        background-color: @wu-color-gray;
    }
}

// Outlined
.badge-outlined {
    background-color: transparent;
    border: 1px solid;

    &.badge-yellow {
        border-color: darken(@wu-color-yellow-dark, 7%);
        color: darken(@wu-color-yellow-dark, 7%);
    }
    &.badge-amber {
        border-color: darken(@wu-color-amber, 7%);
        color: darken(@wu-color-amber, 7%);
    }
    &.badge-orange {
        border-color: darken(@wu-color-orange, 7%);
        color: darken(@wu-color-orange, 7%);
    }
    &.badge-green {
        border-color: darken(@wu-color-green, 7%);
        color: darken(@wu-color-green, 7%);
    }
    &.badge-teal {
        border-color: darken(@wu-color-teal, 7%);
        color: darken(@wu-color-teal, 7%);
    }
    &.badge-blue {
        border-color: darken(@wu-color-blue, 7%);
        color: darken(@wu-color-blue, 7%);
    }
    &.badge-purple {
        border-color: darken(@wu-color-purple, 7%);
        color: darken(@wu-color-purple, 7%);
    }
    &.badge-gray {
        border-color: @wu-color-gray;
        color: @wu-color-gray;
    }
}
</style>
