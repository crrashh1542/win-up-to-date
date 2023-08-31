<script>
export default {
    name: 'WidgetCatalog'
}
</script>

<template>
    <div class="title">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.title {
    color: @wu-color-text-imp;
    font-size: @wu-font-catalog-size;
    font-weight: @wu-font-catalog-weight;
    margin-bottom: 10px;
}
</style>