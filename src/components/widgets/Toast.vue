<!--
    Toast 提示组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.74.2/packages/react-components/react-toast/library/src/components/Toast
-->
<script setup lang="ts">
import CheckmarkCircle24Icon from '@iconify-vue/fluent-color/checkmark-circle-24'
import DismissCircle24Icon from '@iconify-vue/fluent-color/dismiss-circle-24'
import Warning24Icon from '@iconify-vue/fluent-color/warning-24'
import Info24Filled from '@iconify-vue/fluent/info-24-filled'

import type { ToastIntent } from '@/types'

const intentIcons: Record<ToastIntent, typeof CheckmarkCircle24Icon> = {
    success: CheckmarkCircle24Icon,
    error: DismissCircle24Icon,
    warning: Warning24Icon,
    info: Info24Filled,
}

const props = defineProps<{
    title: string
    body?: string
    intent?: ToastIntent
}>()
</script>

<template>
    <div :class="['toast', { 'title-only': !props.body }]">
        <div
            class="toast-icon"
            :style="props.intent === 'info' ? { color: '#0f6cbd' } : {}"
        >
            <component
                :is="intentIcons[props.intent ?? 'info']"
                width="24"
                height="24"
            />
        </div>
        <div class="toast-content">
            <span class="toast-title">{{ props.title }}</span>
            <span class="toast-body" v-if="props.body">{{ props.body }}</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.toast {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    padding: 12px;
    border-radius: @wu-layout-radius;
    border: 1px solid #e0e0e0;
    box-shadow: @wu-layout-shadow;
    background-color: #fff;
    font-size: 14px;
    line-height: 20px;
    min-width: 350px;
    max-width: 800px;

    &.title-only {
        align-items: center;
    }

    .toast-icon {
        display: flex;
        padding-top: 2px;
        margin-right: 8px;
    }

    .toast-content {
        display: flex;
        flex-direction: column;
        word-break: break-word;

        .toast-title {
            font-weight: 600;
            color: @wu-color-text-imp;
        }

        .toast-body {
            padding-top: 4px;
            font-size: 13px;
            font-weight: 400;
            color: @wu-color-text-accent;
        }
    }
}
</style>
