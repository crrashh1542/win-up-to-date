<!-- 
    此组件移植自 FluentUI React v9 的 Switch 组件
    参考：https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.72.2/packages/react-components/react-switch/library/src/components/Switch
-->
<script setup lang="ts">
import Circle20FilledIcon from '@iconify-vue/fluent/circle-20-filled'

const model = defineModel<boolean>()
const props = withDefaults(defineProps<{
    isDisabled?: boolean
}>(), {
    isDisabled: false
})
</script>

<template>
    <div class="switch">
        <input class="input-box" role="switch" type="checkbox"
               v-model="model" :disabled="isDisabled" />
        <div aria-hidden="true" class="indicator">
            <Circle20FilledIcon width="18" height="18" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.switch {
    align-items: flex-start;
    box-sizing: border-box;
    display: inline-flex;
    position: relative;

    .input-box {
        box-sizing: border-box;
        cursor: pointer;
        height: 100%;
        margin: 0;
        opacity: 0;
        position: absolute;
        width: 56px; // 40 + 2*8
    }

    .indicator {
        border-radius: 10000px;
        border: 1px solid #000;
        line-height: 0;
        box-sizing: border-box;
        fill: currentColor;
        flex-shrink: 0;
        font-size: 18px;
        height: 20px;
        margin: 8px;
        pointer-events: none;
        transition-duration: 200ms;
        transition-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
        transition-property: background, border, color;
        width: 40px;
        * {
            transition-duration: 200ms;
            transition-timing-function: cubic-bezier(0.33, 0 ,0.67, 1);
            transition-property: transform;
        }
    }

    .input-box:disabled {
        cursor: default;
    }
    .input-box:checked ~ .indicator > * {
        transform: translateX(20px);
    }
    .input-box:disabled ~ .indicator {
        color: #5c5c5c;
    }
    .input-box:enabled:not(:checked) ~ .indicator {
        color: #616161;
        border-color: #616161;
    }
    .input-box:enabled:not(:checked):hover ~ .indicator {
        color: #575757;
        border-color: #575757;
    }
    .input-box:enabled:not(:checked):hover:active ~ .indicator {
        color: #b3b3b3;
        border-color: #b3b3b3;
    }
    .input-box:enabled:checked ~ .indicator {
        background-color: #0078d4;
        color: #fff;
        border-color: transparent;
    }
    .input-box:enabled:checked:hover ~ .indicator {
        background-color: #106ebe;
        border-color: transparent;
    }
    .input-box:enabled:checked:hover:active ~ .indicator {
        background-color: #005a9e;
        border-color: transparent;
    }
    .input-box:disabled ~ .indicator {
        color: #bdbdbd;
    }
    .input-box:disabled:not(:checked) ~ .indicator {
        border-color: #e0e0e0;
    }
    .input-box:disabled:checked ~ .indicator {
        background-color: #f0f0f0;
        border-color: transparent;
    }
}

</style>
