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
@import url('../../assets/styles/theme.less');

.card {
    margin: 5px 5px 0 0;
    padding: 10px 5px 10px 20px;
    // height: var(--card-height);
    width: var(--card-width);
    line-height: 1.2;
    display: inline-block;

    .info {
        .category {
            font-size: 18px;
        }

        .version {
            font-size: 24px;
            padding: 0 0 10px;
            font-weight: 500;
        }

        .spacer {
            width: 40px;
        }
        
        .detail {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
            word-break: break-word;
        }
        .detail::before {
            font-size: 14px;
            padding-right: 7px;
        }

        .detail.branch::before { content: '\e993'; }
        .detail.codename::before { content: '\e9d7'; }
        .detail.period::before { content: '\e61d'; }
    }
}

/* 不同设备端适配 */

// SEC 1 ------ 三列
@media screen and (min-width: 1000px) {
    // .card { --card-height: 80px; }
}
@media screen and (max-width: 1000px) {
    // .card { --card-height: 98px; }
}

// SEC 2 ------ 两列
@media screen and (min-width: 930px) {
    .card {--card-width: 32%; }
}
@media screen and (max-width: 930px) {
    .card { --card-width: 48%; /*--card-height: 80px;*/ }
}
@media screen and (max-width: 650px) {
    // .card { --card-height: 98px; }
}

// SEC 3 ------ 一列
@media screen and (max-width: 560px) {
    .card { --card-width: 100%; /*--card-height: 80px;*/ }
}
</style>
