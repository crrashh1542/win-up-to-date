<script setup lang="ts">
import { computed } from 'vue'
import type { BuiltInColor } from '@/types'

export type ButtonVariant = 'normal' | 'outlined' | 'filled'

defineOptions({ name: 'WidgetButton' })

const props = withDefaults(
    defineProps<{
        variant?: ButtonVariant
        color?: BuiltInColor
    }>(),
    {
        variant: 'normal',
        color: 'blue',
    }
)

const classes = computed(() => {
    if (props.variant === 'normal') return []
    return [`btn-${props.variant}`, `btn-${props.color}`]
})
</script>

<template>
    <button :class="classes">
        <span v-if="$slots.before" class="btn-before">
            <slot name="before" />
        </span>
        <slot />
        <span v-if="$slots.after" class="btn-after">
            <slot name="after" />
        </span>
    </button>
</template>

<style lang="less" scoped>
button {
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    padding: 0.45em 0.7em;
    border: 1px solid darken(@wu-color-border, 5%);
    border-radius: @wu-layout-radius;
    font-size: 14px;
    background-color: @wu-color-main;
    cursor: pointer;
    transition: background-color 0.3s;
}
button:hover {
    background-color: @wu-color-base;
}

.btn-before,
.btn-after {
    display: contents;
}

// Outlined
.btn-outlined {
    background-color: transparent;

    &.btn-yellow {
        border-color: @wu-color-yellow-dark;
        color: @wu-color-yellow-dark;
        &:hover {
            background-color: @wu-color-yellow-light;
        }
    }
    &.btn-amber {
        border-color: @wu-color-amber;
        color: @wu-color-amber;
        &:hover {
            background-color: fade(@wu-color-amber, 7%);
        }
    }
    &.btn-orange {
        border-color: @wu-color-orange;
        color: @wu-color-orange;
        &:hover {
            background-color: fade(@wu-color-orange, 7%);
        }
    }
    &.btn-green {
        border-color: @wu-color-green;
        color: @wu-color-green;
        &:hover {
            background-color: fade(@wu-color-green, 7%);
        }
    }
    &.btn-teal {
        border-color: @wu-color-teal;
        color: @wu-color-teal;
        &:hover {
            background-color: fade(@wu-color-teal, 7%);
        }
    }
    &.btn-blue {
        border-color: @wu-color-blue;
        color: @wu-color-blue;
        &:hover {
            background-color: fade(@wu-color-blue, 7%);
        }
    }
    &.btn-purple {
        border-color: @wu-color-purple;
        color: @wu-color-purple;
        &:hover {
            background-color: fade(@wu-color-purple, 7%);
        }
    }
}

// Filled
.btn-filled {
    border-color: transparent;
    color: #fff;

    &.btn-yellow {
        background-color: @wu-color-yellow-dark;
        &:hover {
            background-color: darken(@wu-color-yellow-dark, 8%);
        }
    }
    &.btn-amber {
        background-color: @wu-color-amber;
        color: #000;
        &:hover {
            background-color: darken(@wu-color-amber, 8%);
        }
    }
    &.btn-orange {
        background-color: @wu-color-orange;
        &:hover {
            background-color: darken(@wu-color-orange, 8%);
        }
    }
    &.btn-green {
        background-color: @wu-color-green;
        color: #000;
        &:hover {
            background-color: darken(@wu-color-green, 8%);
        }
    }
    &.btn-teal {
        background-color: @wu-color-teal;
        &:hover {
            background-color: darken(@wu-color-teal, 8%);
        }
    }
    &.btn-blue {
        background-color: @wu-color-blue;
        &:hover {
            background-color: darken(@wu-color-blue, 8%);
        }
    }
    &.btn-purple {
        background-color: @wu-color-purple;
        &:hover {
            background-color: darken(@wu-color-purple, 8%);
        }
    }
}
</style>
