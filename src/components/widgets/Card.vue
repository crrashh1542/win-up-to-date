<script setup lang="ts">
const props = withDefaults(defineProps<{
    mode?: 'inline' | 'block' | 'flex'
    shadow?: boolean
}>(), {
    mode: 'block',
    shadow: false
})
</script>

<template>
    <div :class="['card', props.mode, shadow ? 'shadow' : '']">
        <slot></slot>
    </div>
</template>

<style lang="less">
.card {
    padding: @wu-layout-card-padding-y @wu-layout-card-padding-x;
    line-height: 1.2;
    border-radius: @wu-layout-radius;
    background-color: @wu-color-main;
    border: 1px solid @wu-color-border;
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
.card.shadow {
    box-shadow: @wu-layout-shadow;
}
</style>
