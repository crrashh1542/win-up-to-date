<script setup lang="ts">
/**
 * 可复制代码组件，代码右侧有个小复制按钮
 * 用法：<Code value="xxx" />
 */

import { computed, ref } from 'vue'
import Copy16RegularIcon from '@iconify-vue/fluent/copy-16-regular'
import Checkmark16RegularIcon from '@iconify-vue/fluent/checkmark-16-regular'

import Button from './Button.vue'
import { useToastStore } from '@/stores/toast'

const props = withDefaults(defineProps<{
    value?: string
    isCopiable?: boolean
    isBreakWord?: boolean
}>(), {
    isCopiable: false,
    isBreakWord: false
})

const toast = useToastStore()
const isCopied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const copy = async () => {
    if (!props.value) return
    try {
        await navigator.clipboard.writeText(props.value)
        // 复制完成后显示已复制 1.5s
        isCopied.value = true
        if (copiedTimer) clearTimeout(copiedTimer)
        copiedTimer = setTimeout(() => { isCopied.value = false }, 1500)
    } catch {
        toast.show({ title: '复制内容失败', intent: 'error' })
    }
}

const breakWord = computed(() => props.isBreakWord ? 'break-word' : '')
</script>

<template>
    <!-- 代码本体 -->
    <code :class="breakWord">{{ value }}</code>

    <!-- 复制按钮 -->
    <Button @click="copy" v-if="isCopiable">
        <Checkmark16RegularIcon v-if="isCopied" width="1.25em" height="1.25em" />
        <Copy16RegularIcon v-else width="1.25em" height="1.25em" />
        {{ isCopied ? '已复制' : '复制' }}
    </Button>
</template>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap");

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

button {
    margin-left: .4em;
}
</style>
