<script setup>
/**
 * 可复制代码组件，代码右侧有个小复制按钮
 * 用法：<Code value="xxx" />
 */

// 引入库
import Button from './Button.vue'
import useClipboard from 'vue-clipboard3'
import Copy16RegularIcon from '@iconify-vue/fluent/copy-16-regular'

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
        <div><Copy16RegularIcon width="1.25em" height="1.25em" />复制</div>
    </Button>

    <!-- 复制完成的提示 -->
    <!-- TODO -->
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

code {
    background-color: #f3f3f3;
    border: 1px solid #ddd;
    padding: .1em .4em;
    line-height: 1.5;
    border-radius: 4px;
    font-family: 'JetBrainsMono NF', 'JetBrains Mono', monospace;
    font-size: 14px;
}
code.break-word {
    word-break: break-all;
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
