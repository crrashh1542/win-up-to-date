<!--
    此组件部分代码修改自 FluentUI React v9 的 Spinner 组件
    参考：https://github.com/microsoft/fluentui/blob/@fluentui/react-components_v9.74.2/packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts
-->

<script setup lang="ts">
// 接收 filled 参数，若为 true 则在整个 div 居中显示，否则仅内联显示
const props = defineProps({
    filled: { type: Boolean, default: false }
})
</script>

<template>
    <div :class="['wrapper', { filled }]">
        <div class="load-anim">
            <div class="tail"></div>
        </div>
        <div class="tip" v-if="filled">
            数据正在玩命加载中 ᕕ( ᐛ )ᕗ
        </div>
    </div>

    <!--
        若filled为true，则需要其内有内容支撑，否则整个外部flex的高度会多出24px
        导致Footer组件被挤到页面底部之外，出现排版错误。
    -->
    <div class="placeholder" v-if="filled" aria-hidden="true">&nbsp;</div>
</template>

<style lang="less" scoped>

.load-anim {
    --spinner-size: 42px;
    --spinner-stroke-width: 4px;
    position: relative;
    flex-shrink: 0;
    height: var(--spinner-size);
    width: var(--spinner-size);

    // 用 maskImage 创建环形镂空效果，替代旧的 border 方案
    mask-image: radial-gradient(
        closest-side,
        transparent calc(100% - var(--spinner-stroke-width) - 1px),
        white calc(100% - var(--spinner-stroke-width)) calc(100% - 1px),
        transparent 100%
    );
    background-color: #d7e8fb; // colorBrandStroke2
    color: #0f6cbd; // colorBrandStroke1
    animation: spin-rotate 1.5s infinite linear; // 外层旋转

    @media screen and (forced-colors: active) {
        background-color: HighlightText;
        color: Highlight;
        forced-color-adjust: none;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        animation-duration: 1.8s;
    }
}

.tail {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    mask-image: conic-gradient(transparent 105deg, white 105deg);
    animation: spin-swing 1.5s infinite cubic-bezier(0.33, 0, 0.67, 1);

    &::before,
    &::after {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        animation: inherit;
        background-image: conic-gradient(currentcolor 135deg, transparent 135deg);
    }
    &::before {
        animation-name: spin-start;
    }
    &::after {
        animation-name: spin-end;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        animation-iteration-count: 0;
        background-image: conic-gradient(transparent 120deg, currentcolor 360deg);
        &::before,
        &::after {
            content: none;
        }
    }
}

@keyframes spin-rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes spin-swing {
    0% {
        transform: rotate(-135deg);
    }
    50% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(225deg);
    }
}
@keyframes spin-start {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(105deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
@keyframes spin-end {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(225deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

// 若要求整个加载动画居中显示
.wrapper.filled {
    --spinner-stroke-width: 6px;
    --spinner-size: 64px;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -66%;
    .load-anim {
        margin: auto;
    }
    .tip {
        margin-top: 1em;
    }
}
.placeholder {
    opacity: 0;
}
</style>
