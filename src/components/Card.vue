<script>
import { provideFluentDesignSystem, fluentCard } from '@fluentui/web-components'
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
@import url('../assets/styles/global.less');
@import url('../assets/styles/theme.less');

.card {
    line-height: 1.2;
    display: inline-block;
}

// 如果卡片是一览卡片（即 Card.overview）
.card.overview {
    background-color: #fff;
    display: var(--card-block-display);
    padding: 0 1.5em;

    div {
        width: var(--card-block-flex-width);

        p {
            font-size: var(--card-tsize);
            line-height: 1;
            .suffix {
                display: var(--card-suffix-display);
            }
        }
        p::before {
            padding-right: @wu-icon-spacing;
        }
    }
}

// .overview 的移动端适配
// 630px +
@media screen and (min-width: 630px) {
    .card {
        --card-tsize: 1.1rem;
        --card-block-display: flex;
        --card-block-flex-width: 50%;
    }
}
// 570px ~ 630px
@media screen and (max-width: 630px) {
    .card {
        --card-tsize: 1rem;
        --card-block-display: flex;
        --card-block-flex-width: 100%;
        --card-suffix-display: inline;
    }
}
// 570px -
@media screen and (max-width: 570px) {
    .card {
        --card-block-display: inline-block;
    }
}
</style>
