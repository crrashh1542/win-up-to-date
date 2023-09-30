<script>
import { provideFluentDesignSystem, fluentCard } from "@fluentui/web-components"
provideFluentDesignSystem().register(fluentCard())

export default {
    name: 'WidgetCard'
}
</script>

<template>
    <fluent-card class="card">
        <slot></slot>
    </fluent-card>
</template>

<style lang="less">
@import url('../assets/styles/theme.less');

.card {
    line-height: 1.2;
    display: inline-block;
}
</style>
