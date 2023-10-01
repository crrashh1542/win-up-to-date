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

/* 不同设备端适配 */

// SEC 1 ------ 两列
@media screen and (min-width: 1150px) {
    .card {
        --card-width: 32%;
    }
}
@media screen and (max-width: 1150px) {
    .card {
        --card-width: 48%;
    }
}
// SEC 2 ------ 一列
@media screen and (max-width: 620px) {
    .card {
        --card-width: 100%;
    }
}
</style>
