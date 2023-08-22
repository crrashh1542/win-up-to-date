<script>
export default {
    name: 'WidgetCard'
}
</script>

<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style lang="less">
@import url('../../assets/styles/theme.less');

.card {
    margin: 8px 10px 15px 0;
    padding: 10px 15px 10px 20px;
    height: var(--card-height);
    width: var(--card-width);
    display: inline-block;
    border-radius: 8px;

    .icon {
        font-size: 32px;
        padding-right: 10px;
    }

    .info {
        .title {
            font-size: 22px;
            padding-bottom: 2px;
        }

        .value {
            font-size: 16px;
            line-height: 1.25;
            color: #555;
            word-break: break-word;
        }
    }
}

/* 不同设备端适配 */

// SEC 1 ------ 三列
@media screen and (min-width: 1000px) {
    .card { --card-height: 80px; }
}
@media screen and (max-width: 1000px) {
    .card { --card-height: 98px; }
}

// SEC 2 ------ 两列
@media screen and (min-width: 870px) {
    .card {--card-width: 32%; }
}
@media screen and (max-width: 870px) {
    .card { --card-width: 48%; --card-height: 80px; }
}
@media screen and (max-width: 650px) {
    .card { --card-height: 98px; }
}

// SEC 3 ------ 一列
@media screen and (max-width: 560px) {
    .card { --card-width: 100%; --card-height: 80px; }
}
</style>
