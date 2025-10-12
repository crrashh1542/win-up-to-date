<script setup>
/**
 * 可复制代码组件，代码右侧有个小复制按钮
 * 用法：<Code value="xxx" />
 */

// 引入库
import Button from './Button.vue'
import useClipboard from 'vue-clipboard3'
import { Icon } from '@iconify/vue'

const { toClipboard } = useClipboard()

const props = defineProps({ value: String, isCopiable: String, isBreakWord: String })

// 处理是否断词强制换行
let breakWord = ''
if(props.isBreakWord) { breakWord = 'break-word' }
</script>

<template>
    <!-- 代码本体 -->
    <code :class="breakWord">{{ value }}</code>

    <!-- 复制按钮 -->
    <Button @click="toClipboard(value)" v-if="isCopiable">
        <div>
            <Icon icon="fluent:copy-16-regular" width="16" height="16" />
            复制</div>
    </Button>

    <!-- 复制完成的提示 -->
    <!-- TODO -->
</template>

<style lang="less">
@import url('@/styles/global.less');

code {
    background-color: #f3f3f3;
    border: 1px solid #ddd;
    padding: .2em .4em;
    line-height: 1.5rem;
    border-radius: 4px;
    font-family: 'JetBrains Mono' !important;
    font-size: 14px;
}
code.break-word {
    word-break: break-all;
}

.button {
	font-size: 1rem;
    line-height: 1.25rem;
    padding: .4em .6em;
    margin: .2em .4em;
    div {
        display: flex;
        align-items: center;
        gap: 4px;
    }
}
</style>
