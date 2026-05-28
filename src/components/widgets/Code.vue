<script setup lang="ts">
/**
 * 可复制代码组件，代码右侧有个小复制按钮
 * 用法：<Code value="xxx" />
 */

import { computed } from 'vue'
import Button from './Button.vue'
import Copy16RegularIcon from '@iconify-vue/fluent/copy-16-regular'

const props = defineProps<{ value?: string; isCopiable?: boolean; isBreakWord?: boolean }>()

const copy = async () => {
    if (!props.value) return
    try {
        await navigator.clipboard.writeText(props.value)
    } catch {
        console.error('复制失败：剪贴板 API 不可用')
    }
}

const breakWord = computed(() => props.isBreakWord ? 'break-word' : '')
</script>

<template>
    <!-- 代码本体 -->
    <code :class="breakWord">{{ value }}</code>

    <!-- 复制按钮 -->
    <Button @click="copy" v-if="isCopiable">
        <div><Copy16RegularIcon width="1.25em" height="1.25em" />复制</div>
    </Button>

    <!-- 复制完成的提示 -->
    <!-- TODO -->
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

code {
    background-color: @wu-color-base;
    border: 1px solid @wu-color-border;
    padding: .2em .4em;
    line-height: 1.5;
    border-radius: 4px;
    font-family: 'JetBrainsMono NF', 'JetBrains Mono', monospace;
    font-size: 14px;
}
code.break-word {
    overflow-wrap: break-word;
}

.button {
    font-size: 14px;
    line-height: 1.25rem;
    padding: .3em .6em;
    margin-left: .4em;
    div {
        display: flex;
        align-items: center;
        gap: 4px;
    }
}
</style>
