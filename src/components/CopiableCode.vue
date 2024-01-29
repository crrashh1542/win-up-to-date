<script>
/**
 * 可复制代码组件，代码右侧有个小复制按钮
 * 用法：<CopiableCode value="xxx" />
 */

// 引入库
import { provideFluentDesignSystem, fluentButton } from "@fluentui/web-components"
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
provideFluentDesignSystem().register(fluentButton())

export default {
    name: 'WidgetCopiableCode',
    props: {
        value: String
    },
    methods: {
        copy(content) {
            toClipboard(content)
        }
    }
}
</script>

<template>
    <!-- 代码本身 -->
    <code class="text-base leading-7">{{ value }}</code>

    <!-- 复制按钮 -->
    <fluent-button class="text-sm" @click="copy(value)">
        <span class="icon-copy">复制</span>
    </fluent-button>

    <!-- 复制完成的提示 -->
    <!-- TODO -->
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

code {
    background-color: @wu-color-theme-lighter;
    border: 1px solid #ddd;
    padding: .2em .36em;
    border-radius: 4px;
}

span::before {
    margin-right: @wu-icon-spacing;
}

fluent-button {
    margin-left: @wu-icon-spacing;
    font-family: 'iconfont', 'Segoe UI Variable', 'Segoe UI', sans-serif;
}
</style>