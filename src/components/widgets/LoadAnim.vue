<!-- 
    此组件部分代码修改自 FluentUI Web Components v3 的 spinner 组件
    参考：https://github.com/microsoft/fluentui/blob/@fluentui/web-components_v3.0.0-beta.73/packages/web-components/src/spinner/spinner.styles.ts
-->
<script setup>
// 接收 mode 参数，若是 filled 则在整个 div 居中显示，否则仅内联显示
const props = defineProps(['mode'])
let mode = props.mode
if (mode !== 'filled'){ mode = '' }
</script>

<template>
    <div :class="'wrapper ' + mode">
        <div class="load-anim">
            <div class="background"></div>
            <div class="progress">
                <div class="spinner">
                    <div class="start">
                        <div class="indicator"></div>
                    </div>
                    <div class="end">
                        <div class="indicator"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tip" v-if="mode == 'filled'">
            数据正在玩命加载中 ᕕ( ᐛ )ᕗ
        </div>
    </div>

    <!--
        若mode为filled，则需要其内有内容支撑，否则整个外部flex的高度会多出24px
        导致Footer组件被挤到页面底部之外，出现排版错误。
    -->
    <div class="placeholder" v-if="mode == 'filled'">placeholder</div>
</template>

<style lang="less" scoped>
.load-anim {
    --spinner-duration: 1.5s;
    --spinner-indicatorSize: 4px;
    --spinner-size: 42px;
    --spinner-colorBrandStroke1: #0f6cbd;
    --spinner-colorBrandStroke2: #d7e8fb;
    display: flex;
    height: var(--spinner-size);
    width: var(--spinner-size);
    contain: strict;
    content-visibility: auto;
    .progress, .background, .spinner,
    .start, .end, .indicator {
        position: absolute;
        inset: 0;
    }
    .progress, .spinner, .indicator {
        animation: none var(--spinner-duration) infinite cubic-bezier(0.33,0,0.67,1);
    }
    .progress {
        animation-timing-function: linear;
        animation-name: spin-linear;
        border-radius: 50%;
    }
    .background {
        border: var(--spinner-indicatorSize) solid var(--spinner-colorBrandStroke2);
        border-radius: 50%;
    }
    .spinner {
        animation-name: spin-swing;
    }
    .start {
        overflow: hidden;
        inset-inline-end: 50%;
    }
    .end {
        overflow: hidden;
        inset-inline-start: 50%;
    }
    .indicator {
        color: var(--spinner-colorBrandStroke1);
        box-sizing: border-box;
        border-radius: 50%;
        border: var(--spinner-indicatorSize) solid transparent;
        border-block-start-color: currentcolor;
        border-inline-end-color: currentcolor;
    }
    .start .indicator {
        rotate: 135deg; /* Starts 9 o'clock */
        inset: 0 -100% 0 0;
        animation-name: spin-start;
    }
    .end .indicator {
        rotate: 135deg; /* Ends at 3 o'clock */
        inset: 0 0 0 -100%;
        animation-name: spin-end;
    }
}

@keyframes spin-linear {
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
    0%, 100% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(-80deg);
    }
}
@keyframes spin-end {
    0%, 100% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(70deg);
    }
}

// 若要求整个加载动画居中显示
.wrapper.filled {
    --spinner-indicatorSize: 6px;
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