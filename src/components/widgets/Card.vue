<script setup lang="ts">
const props = withDefaults(defineProps<{ mode?: 'inline' | 'block' | 'flex' }>(), {
    mode: 'block'
})
</script>

<template>
    <div :class="['card', props.mode]">
        <slot></slot>
    </div>
</template>

<style lang="less">
.card {
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
    margin-bottom: 4px;
}
.card.flex {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}
</style>
