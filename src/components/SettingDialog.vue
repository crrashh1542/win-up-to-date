<script>
import Catalog from './widgets/Catalog.vue'
import packageInfo from '/package.json'
import {
    provideFluentDesignSystem, fluentDialog, fluentButton, fluentSwitch
}
    from '@fluentui/web-components'
provideFluentDesignSystem().register(
    fluentDialog(), fluentButton(), fluentSwitch())

export default {
    name: 'MainDialog',
    components: { Catalog },
    data() {
        return { packageInfo }
    },
    methods: {
        dialogClose() {
            let dialogEl = document.getElementById('setting')
            dialogEl.hidden = true
        }
    }
}
</script>

<template>
    <fluent-dialog id="setting" trap-focus hidden modal>
        <div class="container">
            <catalog class="title">页面选项</catalog>

            <p class="flex">
                <span>启用深色模式</span>
                <span class="grow"></span>
                <fluent-switch></fluent-switch>
            </p>

            <p class="flex">
                <span>显示开发代号、周期</span>
                <span class="grow"></span>
                <fluent-switch></fluent-switch>
            </p>

            <p class="flex">
                <span>显示系统所在分支</span>
                <span class="grow"></span>
                <fluent-switch></fluent-switch>
            </p>

            <div class="button">
                <fluent-button appearance="accent" @click="dialogClose()">关闭</fluent-button>
            </div>

            <div class="version">
                当前项目版本：v{{ packageInfo.version }}
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

    .title {
        font-size: 28px;
    }

    p {
        line-height: 2;
        font-size: 20px;
    }

    .version {
        position: absolute;
        bottom: @dialog-padding;
        left: @dialog-padding;
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