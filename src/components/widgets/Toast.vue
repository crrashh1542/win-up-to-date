<!--
    Toast 提示组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.74.2/packages/react-components/react-toast/library/src/components/Toast
-->
<script setup lang="ts">
import CheckmarkCircle24Filled from '@iconify-vue/fluent/checkmark-circle-24-filled'
import DismissCircle24Filled from '@iconify-vue/fluent/dismiss-circle-24-filled'
import Warning24Filled from '@iconify-vue/fluent/warning-24-filled'
import Info24Regular from '@iconify-vue/fluent/info-24-regular'

import type { ToastIntent } from '@/types'

const intentIcons: Record<ToastIntent, typeof CheckmarkCircle24Filled> = {
    success: CheckmarkCircle24Filled,
    error: DismissCircle24Filled,
    warning: Warning24Filled,
    info: Info24Regular,
}
const intentColor: Record<ToastIntent, string> = {
    success: '#0e700e',
    error: '#b10e1c',
    warning: '#bc4b09',
    info: '#424242',
}

const props = defineProps<{
    title: string
    body?: string
    intent?: ToastIntent
}>()
</script>

<template>
    <div :class="['toast', { 'title-only': !props.body }]">
        <div class="toast-icon" :style="{ color: intentColor[props.intent ?? 'info'] }">
            <component :is="intentIcons[props.intent ?? 'info']" width="24" height="24" />
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
