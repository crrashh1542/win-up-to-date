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

    .info {
        .category {
            font-size: 18px;
            font-weight: 500;
        }

        .version {
            font-size: 24px;
            padding: 4px 0 10px;
            font-weight: 500;
        }

        .spacer {
            width: 40px;
        }
        
        .detail {
            font-size: 16px;
            line-height: 1.5;
            word-break: break-word;
        }
        .detail::before {
            font-size: 14px;
            padding-right: 7px;
        }

        .detail.detail.branch { color: #212121; }
        .detail.branch::before { content: '\e993'; }
        .detail.codename::before { content: '\e9d7'; }
    }
}

/* 不同设备端适配 */

// SEC 1 ------ 两列
@media screen and (min-width: 1070px) {
    .card {--card-width: 32%; }
}
@media screen and (max-width: 1070px) {
    .card { --card-width: 48%; /*--card-height: 80px;*/ }
}

// SEC 2 ------ 一列
@media screen and (max-width: 620px) {
    .card { --card-width: 100%; /*--card-height: 80px;*/ }
}
</style>
