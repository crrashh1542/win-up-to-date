<script>
export default {
    name: 'WidgetCatalog'
}
</script>

<template>
    <div class="title text-2xl my-3 font-medium">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.title {
    color: @wu-color-text-imp;
    margin-bottom: 10px;
}
</style>