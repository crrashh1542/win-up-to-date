<!--
    此组件移植自 FluentUI React v9 的 TabList 组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.74.4/packages/react-components/react-tabs/library/src/components/TabList
-->
<script setup lang="ts">
import { provide, ref, watch } from 'vue'

export type TabValue = unknown

interface Props {
    disabled?: boolean
    selectedValue?: TabValue
    defaultSelectedValue?: TabValue
    selectTabOnFocus?: boolean
    vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    selectTabOnFocus: false,
    vertical: false,
})

const model = defineModel<TabValue>()

const selectedValue = ref<TabValue>(
    model.value ?? props.selectedValue ?? props.defaultSelectedValue
)

watch(model, (val) => {
    selectedValue.value = val
})

watch(selectedValue, (val) => {
    if (model.value !== val) {
        model.value = val
    }
})

const registeredTabs = ref<Map<string, { value: TabValue; el: HTMLElement }>>(
    new Map()
)

function getKey(value: TabValue): string {
    return JSON.stringify(value)
}

function registerTab(data: { value: TabValue; el: HTMLElement }) {
    registeredTabs.value.set(getKey(data.value), data)
}

function unregisterTab(data: { value: TabValue }) {
    registeredTabs.value.delete(getKey(data.value))
}

function selectTab(value: TabValue) {
    if (props.disabled) return
    selectedValue.value = value
}

function getRegisteredTabRect(value?: TabValue) {
    const key = isValueDefined(value) ? getKey(value) : undefined
    const el = key ? registeredTabs.value.get(key)?.el : undefined
    if (!el) return undefined
    const parentRect = el.parentElement?.getBoundingClientRect()
    const tabRect = el.getBoundingClientRect()
    if (!parentRect) return undefined
    return {
        x: tabRect.x - parentRect.x,
        y: tabRect.y - parentRect.y,
        width: tabRect.width,
        height: tabRect.height,
    }
}

function isValueDefined(value: TabValue): boolean {
    return value != null
}

provide('tablist', {
    disabled: props.disabled,
    selectTabOnFocus: props.selectTabOnFocus,
    vertical: props.vertical,
    selectedValue,
    registerTab,
    unregisterTab,
    selectTab,
    getRegisteredTabRect,
    isValueDefined,
})
</script>

<template>
    <div
        class="tablist"
        role="tablist"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="disabled"
    >
        <slot />
    </div>
</template>

<style lang="less" scoped>
.tablist {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: stretch;
    position: relative;
    overflow: visible;
}
</style>
