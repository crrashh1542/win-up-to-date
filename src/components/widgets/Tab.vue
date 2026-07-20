<!--
    此组件移植自 FluentUI React v9 的 Tab 组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.74.4/packages/react-components/react-tabs/library/src/components/Tab
-->
<script setup lang="ts">
import {
    computed,
    inject,
    onBeforeUnmount,
    onMounted,
    ref,
    useSlots,
    watch,
} from 'vue'

export type TabValue = unknown

interface TabListContext {
    disabled: boolean
    selectTabOnFocus: boolean
    vertical: boolean
    selectedValue: { value: TabValue }
    registerTab: (data: { value: TabValue; el: HTMLElement }) => void
    unregisterTab: (data: { value: TabValue }) => void
    selectTab: (value: TabValue) => void
    getRegisteredTabRect: (
        value?: TabValue
    ) => { x: number; y: number; width: number; height: number } | undefined
    isValueDefined: (value: TabValue) => boolean
}

interface Props {
    disabled?: boolean
    value: TabValue
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
})

const slots = useSlots()
const tabRef = ref<HTMLButtonElement | null>(null)

const context = inject<TabListContext>('tablist')!

const selected = computed(() => context.selectedValue.value === props.value)
const isDisabled = computed(() => context.disabled || props.disabled)
const isVertical = computed(() => context.vertical)

// Animation state for the sliding indicator
const animationValues = ref({ offset: 0, scale: 1 })
const lastAnimatedFrom = ref<TabValue>(undefined)
const isAnimating = ref(false)

function calculateIndicatorTransform(): string {
    const { offset, scale } = animationValues.value
    if (isVertical.value) {
        return `translateY(${offset}px) scaleY(${scale})`
    }
    return `translateX(${offset}px) scaleX(${scale})`
}

watch(
    () => context.selectedValue.value,
    (newVal, oldVal) => {
        if (
            selected.value &&
            context.isValueDefined(oldVal) &&
            lastAnimatedFrom.value !== oldVal
        ) {
            const prevRect = context.getRegisteredTabRect(oldVal)
            const currRect = context.getRegisteredTabRect(newVal)

            if (prevRect && currRect) {
                const offset = isVertical.value
                    ? prevRect.y - currRect.y
                    : prevRect.x - currRect.x

                const scale = isVertical.value
                    ? prevRect.height / currRect.height
                    : prevRect.width / currRect.width

                animationValues.value = { offset, scale }
                lastAnimatedFrom.value = oldVal
                isAnimating.value = false

                // Trigger animation on next frame
                requestAnimationFrame(() => {
                    isAnimating.value = true
                    animationValues.value = { offset: 0, scale: 1 }
                })
            }
        } else if (
            !selected.value &&
            context.isValueDefined(lastAnimatedFrom.value)
        ) {
            lastAnimatedFrom.value = undefined
        }
    }
)

const indicatorStyle = computed(() => {
    if (!selected.value || isDisabled.value) return {}
    return {
        '--tab-indicator-transform': calculateIndicatorTransform(),
        '--tab-indicator-transition': isAnimating.value
            ? 'transform 0.32s cubic-bezier(0.1, 0.9, 0.2, 1)'
            : 'none',
    }
})

const classes = computed(() => [
    'tab-button',
    {
        selected: selected.value,
        disabled: isDisabled.value,
        vertical: isVertical.value,
        animated: selected.value && isAnimating.value,
    },
])

function handleClick() {
    if (!isDisabled.value) {
        context.selectTab(props.value)
    }
}

function handleFocus() {
    if (context.selectTabOnFocus && !isDisabled.value) {
        context.selectTab(props.value)
    }
}

onMounted(() => {
    if (tabRef.value) {
        context.registerTab({ value: props.value, el: tabRef.value })
    }
})

onBeforeUnmount(() => {
    context.unregisterTab({ value: props.value })
})

watch(
    () => props.value,
    (newVal, oldVal) => {
        if (newVal !== oldVal && tabRef.value) {
            context.unregisterTab({ value: oldVal })
            context.registerTab({ value: newVal, el: tabRef.value })
        }
    }
)
</script>

<template>
    <button
        ref="tabRef"
        :class="classes"
        role="tab"
        type="button"
        :aria-selected="isDisabled ? undefined : selected"
        :disabled="isDisabled"
        :tabindex="selected ? 0 : -1"
        @click="handleClick"
        @focus="handleFocus"
    >
        <span v-if="slots.icon" class="tab-icon">
            <slot name="icon" />
        </span>
        <span v-if="slots.default" class="tab-content">
            <slot />
        </span>
        <span
            v-if="selected && !isDisabled"
            class="tab-indicator"
            :style="indicatorStyle"
            aria-hidden="true"
        />
    </button>
</template>

<style lang="less" scoped>
.tab-button {
    align-items: center;
    border: none;
    border-radius: @wu-layout-radius;
    cursor: pointer;
    display: grid;
    flex-shrink: 0;
    grid-auto-flow: column;
    grid-template-columns: auto;
    grid-template-rows: auto;
    font-family: @wu-font-family;
    line-height: 1.43;
    outline-style: none;
    position: relative;
    overflow: visible;
    text-transform: none;
    background-color: transparent;
    justify-content: center;
    column-gap: 4px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    color: @wu-color-text-accent;

    &:focus-visible {
        outline: 2px solid @wu-color-blue;
        outline-offset: -2px;
        z-index: 1;
    }

    &.vertical {
        justify-content: start;
    }

    &.selected {
        color: @wu-color-text-imp;
        font-weight: 600;
    }

    &.disabled {
        cursor: not-allowed;
        background-color: transparent;
        color: lighten(@wu-color-text-accent, 25%);
    }
}

.tab-icon {
    grid-column-start: 1;
    grid-row-start: 1;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    overflow: hidden;
    font-size: 20px;
    height: 20px;
    width: 20px;
    color: inherit;

    > :deep(svg) {
        font-size: 20px;
    }
}

.tab-content {
    grid-column-start: 2;
    grid-row-start: 1;
    overflow: hidden;
    padding: 0 2px;
    color: inherit;
}

.tab-indicator {
    position: absolute;
    background-color: @wu-color-blue;
    border-radius: 10000px;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    transform-origin: left;
    transform: var(--tab-indicator-transform);
    transition: var(--tab-indicator-transition);

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.vertical .tab-indicator {
    bottom: 8px;
    left: 0;
    top: 8px;
    width: 3px;
    height: auto;
    transform-origin: top;
}

.disabled .tab-indicator {
    background-color: lighten(@wu-color-text-accent, 25%);
}
</style>
