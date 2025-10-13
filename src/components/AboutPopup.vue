<script setup>

import { Icon } from '@iconify/vue'

import AboutView from '@/views/MainAbout.vue'

const props = defineProps({
    visibility: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:visibility'])
</script>

<template>
    <div v-if="visibility" class="popup-wrapper">
        <div class="popup-container">
            <div class="banner-container">
                <span class="u-banner">关于项目</span>
                <span class="u-grow"></span>
                <span class="button">
                    <icon icon="fluent:dismiss-24-filled" width="24" height="24" @click="emit('update:visibility', false)" />
                </span>
            </div>
            <div class="view-container">
                <about-view />
            </div>
        </div>
    </div>
</template>

<style lang="less" >
@import url('@/styles/global.less');

.popup-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(210, 210, 210, .5);
    z-index: 100;

    .popup-container {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        opacity: 1;
        width: 60%;
        height: 60%;
        max-width: 1600px;
        max-height: 900px;
        min-width: 960px;
        min-height: 600px;
        border-radius: @wu-layout-radius;
        box-shadow: @wu-layout-shadow;
        padding: 2rem 2.5rem;

        .banner-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            .u-banner { margin: 0; }
            svg { cursor: pointer; }
        }
    }
}
</style>