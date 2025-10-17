<script setup>
// 接收 mode 参数，inline，block，flex
const props = defineProps(['mode'])
// 默认为 inline
let mode = 'inline'
// 判断
if(props.mode == 'block') {
    mode = 'block'
} else if(props.mode == 'flex') {
    mode = 'flex'
}
</script>

<template>
    <div :class="'card ' + mode">
        <slot></slot>
    </div>
</template>

<style lang="less">
@import url('@/styles/global.less');

.card {
    margin: 3px 0;
    padding: 16px calc(12px + 1.2%);
    line-height: 1.2;
    border-radius: @wu-layout-radius;
    background-color: @wu-color-main;
    border: 1px solid #e6e6e6;
    font-size: 17px;
}
.card.inline {
    display: inline-block;
}
.card.block {
    display: block;
}
.card.flex {
    display: flex;
    align-items: center;
}
</style>
