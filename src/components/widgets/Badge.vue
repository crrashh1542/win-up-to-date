<script setup lang="ts">
import { computed } from 'vue'
import type { BuiltInColor } from '@/types/data'

defineOptions({ name: 'WidgetBadge' })

const props = withDefaults(defineProps<{
    variant?: 'filled' | 'outlined'
    color?: BuiltInColor
}>(), {
    variant: 'filled',
    color: 'blue',
})

const classes = computed(() => [
    'badge',
    `badge-${props.variant}`,
    `badge-${props.color}`,
])
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
}

// Outlined
.badge-outlined {
    background-color: transparent;
    border: 1px solid;

    &.badge-yellow {
        border-color: @wu-color-yellow-dark;
        color: @wu-color-yellow-dark;
    }
    &.badge-amber {
        border-color: @wu-color-amber;
        color: @wu-color-amber;
    }
    &.badge-orange {
        border-color: @wu-color-orange;
        color: @wu-color-orange;
    }
    &.badge-green {
        border-color: @wu-color-green;
        color: @wu-color-green;
    }
    &.badge-teal {
        border-color: @wu-color-teal;
        color: @wu-color-teal;
    }
    &.badge-blue {
        border-color: @wu-color-blue;
        color: @wu-color-blue;
    }
    &.badge-purple {
        border-color: @wu-color-purple;
        color: @wu-color-purple;
    }
}
</style>
