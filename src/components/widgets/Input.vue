<!--
    此组件部分代码修改自 FluentUI React v9 的 Input 组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.74.4/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts
-->
<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
    disabled?: boolean
    invalid?: boolean
    placeholder?: string
    type?: string
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    invalid: false,
    type: 'text',
})

const model = defineModel<string>()
const slots = useSlots()
const hasContentBefore = computed(() => !!slots.contentBefore)
const hasContentAfter = computed(() => !!slots.contentAfter)

const rootClasses = computed(() => [
    'input-root',
    {
        disabled: props.disabled,
        invalid: props.invalid && !props.disabled,
        'with-content-before': hasContentBefore.value,
        'with-content-after': hasContentAfter.value,
    },
])

const inputClasses = computed(() => [
    'input-field',
    {
        disabled: props.disabled,
        'with-content-before': hasContentBefore.value,
        'with-content-after': hasContentAfter.value,
    },
])

const contentClasses = computed(() => [
    'input-content',
    {
        disabled: props.disabled,
    },
])
</script>

<template>
    <div :class="rootClasses">
        <span
            v-if="hasContentBefore"
            :class="[...contentClasses, 'content-before']"
        >
            <slot name="contentBefore" />
        </span>
        <input
            v-model="model"
            :class="inputClasses"
            :type="type"
            :disabled="disabled"
            :aria-invalid="invalid"
            :placeholder="placeholder"
        />
        <span
            v-if="hasContentAfter"
            :class="[...contentClasses, 'content-after']"
        >
            <slot name="contentAfter" />
        </span>
    </div>
</template>

<style lang="less" scoped>
@padding-root: 8px; // 图标/按钮外侧 padding
@padding-input-combined: @wu-layout-card-padding-x; // 无内容时 input 左右 padding
@padding-input-with-content: 4px; // 有内容时 input 与内容之间

.input-root {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: @padding-input-with-content;
    border-radius: @wu-layout-radius;
    background-color: @wu-color-main;
    position: relative;
    box-sizing: border-box;
    vertical-align: middle;
    min-height: 34px;
    font-size: 14px;
    line-height: 1.43;
    border: 1px solid @wu-color-border;
    border-bottom-color: #616161;

    // 底部聚焦指示条
    &::after {
        box-sizing: border-box;
        content: '';
        position: absolute;
        left: -1px;
        bottom: -1px;
        right: -1px;
        height: max(2px, @wu-layout-radius);
        border-bottom-left-radius: @wu-layout-radius;
        border-bottom-right-radius: @wu-layout-radius;
        border-bottom: 2px solid @wu-color-blue;
        clip-path: inset(calc(100% - 2px) 0 0 0);

        transform: scaleX(0);
        transition-property: transform;
        transition-duration: 0.1s;
        transition-timing-function: cubic-bezier(0.9, 0.1, 1, 0.2);

        @media screen and (prefers-reduced-motion: reduce) {
            transition-duration: 0.01ms;
        }
    }

    &:focus-within {
        outline: 2px solid transparent;

        &::after {
            transform: scaleX(1);
            transition-duration: 0.2s;
            transition-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
        }
    }

    &:focus-within:active::after {
        border-bottom-color: darken(@wu-color-blue, 8%);
    }

    &.invalid:not(.disabled) {
        &:not(:focus-within),
        &:hover:not(:focus-within) {
            border-color: @wu-color-orange;
        }
    }

    &.disabled {
        cursor: not-allowed;
        background-color: transparent;
        border-color: lighten(@wu-color-border, 5%);

        &::after {
            content: unset;
        }

        &:focus-within {
            outline-style: none;
        }
    }

    &.with-content-before {
        padding-left: @padding-root;
    }

    &.with-content-after {
        padding-right: @padding-root;
    }
}

.input-field {
    align-self: stretch;
    box-sizing: border-box;
    flex-grow: 1;
    min-width: 0;
    border-style: none;
    padding: 0 @padding-input-combined;
    color: @wu-color-text-imp;
    background-color: transparent;
    outline-style: none;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;

    &::placeholder {
        color: @wu-color-text-accent;
        opacity: 1;
    }

    &.with-content-before {
        padding-left: @padding-input-with-content;
    }

    &.with-content-after {
        padding-right: @padding-input-with-content;
    }

    &:disabled {
        color: lighten(@wu-color-text-accent, 25%);
        cursor: not-allowed;
        background-color: transparent;

        &::placeholder {
            color: lighten(@wu-color-text-accent, 25%);
        }
    }
}

.input-content {
    box-sizing: border-box;
    color: @wu-color-text-accent;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    > svg,
    > :deep(svg) {
        font-size: 20px;
    }

    &.disabled {
        color: lighten(@wu-color-text-accent, 25%);
    }
}
</style>
