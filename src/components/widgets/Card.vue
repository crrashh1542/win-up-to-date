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
@import url('../../assets/styles/global.less');
@import url('../../assets/styles/theme.less');

.card {
    margin: 8px 10px 15px 0;
    padding: 10px 15px 10px 20px;
    height: 85px;
    width: 32%;
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
            word-break: break-all;
        }
    }
}

/* 不同设备端适配 */
</style>
