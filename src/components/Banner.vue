<script>
import { reactive, toRefs } from 'vue'
import Cookie from 'js-cookie'

export default {
    name: 'MainBanner',
    setup() {
        // 初始是否显示提示框：true
        let isShowWarning = true
        // 如果 cookie 中存储了，则替换掉初始值
        if (Cookie.get('isShowWarning') !== undefined) {
            isShowWarning = Cookie.get('isShowWarning')
        }
        let data = reactive({
            isShowWarning
        })
        return { ...toRefs(data) }
    },
    methods: {
        stopShowingWarning() {
            Cookie.set('isShowWarning', 'false')
            this.isShowWarning = false
        }
    },
    props: {
        description: String
    }
}
</script>

<template>
    <div class="banner">
        <div class="title font-medium"><slot></slot></div>
        <div class="subtitle">{{ description }}</div>
    </div>

    <fluent-card class="warning flex" v-if="isShowWarning == true">
        <div class="leading-7">
            <div class="title font-bold">注意</div>
            <div>项目处于较早期开发阶段，数据正在补全，bug 也会慢慢修复！感谢支持！</div>
        </div>
        <div class="grow"></div>
        <div class="button" @click="stopShowingWarning">&#xe600;</div>
    </fluent-card>

    <div class="h-6"></div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

.banner {
    padding: @wu-layout-nav-height 0 15px;
    margin: 30px 0 0;
    line-height: 1.25;
    .title {
        font-size: var(--banner-title);
        padding-bottom: .35em;
    }
    .subtitle {
        font-size: var(--banner-subtitle);
        color: #444;
    }
}

.warning {
    padding: 8px 12px;
    background-color: @wu-color-yellow-light;
    border: 1px solid @wu-color-yellow;
    border-left: 4px solid @wu-color-amber;

    .title {
        color: @wu-color-yellow-dark;
    }
    .button {
        cursor: pointer;
    }
}

@media screen and (max-width: 800px) {
    .banner {
        --banner-title: 32px;
        --banner-subtitle: 24px;
    }
}
@media screen and (min-width: 800px) {
    .banner {
        --banner-title: 36px;
        --banner-subtitle: 24px;
    }
}
</style>