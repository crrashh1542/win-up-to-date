<script setup lang="ts">
defineOptions({ name: 'WidgetButton' })
</script>

<template>
    <span class="button">
        <slot />
    </span>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.button {
    display: inline-block;
    padding: .6em 1em;
    border: 1px solid @wu-color-border;
    border-radius: @wu-layout-radius;
    font-size: 14px;
    background-color: @wu-color-main;
    cursor: pointer;
    transition: background-color .3s;
}
.button:hover {
    background-color: @wu-color-base;
}
</style>
