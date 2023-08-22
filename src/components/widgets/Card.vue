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

.card {
    margin: 8px 10px 15px 0;
    padding: 10px 20px;
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

.color-theme {
    background-color: @wu-color-theme-lighter;
    border: 1px solid @wu-color-theme;
}
.hover\:color-theme:hover {
    box-shadow: 0 0 6px 1px @wu-color-theme;
}

.color-amber {
    background-color: @wu-color-amber-lighter;
    border: 1px solid @wu-color-amber;
}
.hover\:color-amber:hover {
    box-shadow: 0 0 3px 1px @wu-color-amber;
}

.color-yellow {
    background-color: @wu-color-yellow-lighter;
    border: 1px solid @wu-color-yellow;
}
.hover\:color-yellow:hover {
    box-shadow: 0 0 3px 1px @wu-color-yellow;
}

.color-green {
    background-color: @wu-color-green-lighter;
    border: 1px solid @wu-color-green;
}
.hover\:color-green:hover {
    box-shadow: 0 0 3px 1px @wu-color-green;
}

.color-cyan {
    background-color: @wu-color-cyan-lighter;
    border: 1px solid @wu-color-cyan;
}
.hover\:color-cyan:hover {
    box-shadow: 0 0 3px 1px @wu-color-cyan;
}
</style>