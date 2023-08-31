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
    margin-right: 5px;
    padding: 10px 5px 10px 20px;
    // height: var(--card-height);
    width: var(--card-width);
    line-height: 1.2;
    display: inline-block;
}
</style>
