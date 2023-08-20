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
@import url('../../assets/styles/global.less');

.title {
    color: @wu-color-catalog;
    font-size: @wu-font-catalog-size;
    font-weight: @wu-font-catalog-weight;
}
</style>