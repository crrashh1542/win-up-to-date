<script>
// SEC 1 ------ 引入组件和库
import Catalog from './Catalog.vue'
import {
    provideFluentDesignSystem, fluentDialog, fluentButton, fluentSwitch
} from '@fluentui/web-components'
provideFluentDesignSystem().register(
    fluentDialog(), fluentButton(), fluentSwitch())

// SEC 2 ------- 导出组件
export default {
    name: 'MainDialog',
    components: { Catalog },
    data() {
        return {
            // 设置初始值，避免出现 undefined
            isShowFlight: true,
            isShowBranch: true
        }
    },
    // 设置 emits 中的值
    emits: ['isShowFlight', 'isShowBranch'],
    methods: {
        dialogClose() {
            let dialogEl = document.getElementById('setting')
            dialogEl.hidden = true
        },

        changeStatus(type, state) {
            state = !state

            // 判断要改变的内容
            if (type === 0) {
                // 如果是 flight
                type = 'isShowFlight'
                this.isShowFlight = state
            } else {
                type = 'isShowBranch'
                this.isShowBranch = state
            }

            // 设置并改变值
            let emitData = [type, state]
            this.$emit(type, emitData)
        }
    }
}
</script>

<template>
    <fluent-dialog id="setting" trap-focus hidden modal>
        <div class="container">
            <catalog class="size-7 font-bold">页面选项</catalog>

            <!-- <div class="flex section">
                <span>启用深色模式</span>
                <span class="grow"></span>
                <fluent-switch disabled="true"></fluent-switch>
            </div> -->

            <div class="flex section">
                <span>显示开发代号、周期</span>
                <span class="grow"></span>
                <fluent-switch checked="true" v-model="isShowFlight" @click="changeStatus(0, isShowFlight)"></fluent-switch>
            </div>

            <div class="flex section">
                <span>显示系统所在分支</span>
                <span class="grow"></span>
                <fluent-switch checked="true" v-model="isShowBranch" @click="changeStatus(1, isShowBranch)"></fluent-switch>
            </div>

            <div class="button">
                <fluent-button appearance="accent" @click="dialogClose()">关闭</fluent-button>
            </div>
        </div>
    </fluent-dialog>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

@dialog-padding: 20px;

.container {
    padding: @dialog-padding;
    height: 100%;
    position: relative;

    .section {
        line-height: 2;
        font-size: 20px;
    }

    .button {
        position: absolute;
        bottom: @dialog-padding;
        right: @dialog-padding;

        fluent-button {
            font-size: 16px;
        }
    }
}
</style>