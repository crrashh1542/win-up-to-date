<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { version } from '../../package.json'

import Info24RegularIcon from '@iconify-vue/fluent/info-24-regular'
import Library24RegularIcon from '@iconify-vue/fluent/library-24-regular'
import Settings24RegularIcon from '@iconify-vue/fluent/settings-24-regular'
import Tag24RegularIcon from '@iconify-vue/fluent/tag-24-regular'

import Foo from './Footer.vue'
import Popup from './AboutPopup.vue'
import Search from './Search.vue'

const router = useRouter()
defineOptions({ name: 'MainWrapper' })

const appVersion = ref(version)
const isPopupVisible = ref(false)

const openAbout = () => {
    const mobileRegex =
        /android|iphone|ipad|ipod|blackberry|mobile|phone|webos|kindle|tablet/i
    if (mobileRegex.test(navigator.userAgent.toLowerCase())) {
        // 如果匹配移动端规则，就前往单独的关于页面
        router.push('/about')
    } else {
        // 否则（即 PC 端则通过弹窗展示关于页面）
        isPopupVisible.value = true
    }
}
</script>

<template>
    <!-- Part 1 ---- 顶部导航栏 -->
    <div class="topbar">
        <div class="title">
            <router-link to="/" class="name">Windows Up-to-Date</router-link
            >&nbsp;
            <span class="version">v{{ appVersion }}</span>
        </div>
        <div class="search">
            <Search />
        </div>
        <div class="about">
            <Info24RegularIcon @click="openAbout" />
        </div>
    </div>

    <!-- Part 2 ---- 左侧（移动端底部）导航栏 -->
    <div class="navbar">
        <router-link to="/" class="section">
            <Tag24RegularIcon />
            <div class="name">版本</div>
        </router-link>
        <router-link to="/category" class="section">
            <Library24RegularIcon />
            <div class="name">平台</div>
        </router-link>
        <router-link to="/settings" class="section">
            <Settings24RegularIcon />
            <div class="name">设置</div>
        </router-link>
    </div>

    <!-- Part 3 ---- 主体部分 -->
    <main>
        <!-- 此处 container 撑满 main 内的剩余空间，内容不足时 Footer 被推到页面底部 -->
        <div class="container">
            <slot />
        </div>
        <Foo />
    </main>

    <!-- Part 4 ---- 右上角可触发的”关于”弹窗 -->
    <Popup v-model:visibility="isPopupVisible" />
</template>

<style lang="less" scoped>
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 54px;
    padding: 0 14px;
    font-size: 18px;
    user-select: none;

    .title {
        .name {
            color: #222;
            font-weight: 600;
        }
        .version {
            color: #999;
            font-size: 14px;
        }
    }

    .search {
        margin-right: 10em;
    }

    .about {
        cursor: pointer;
        svg {
            width: 1.2em;
            height: 1.2em;
        }
    }
}

.navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    height: calc(100% - 54px);
    width: 72px;
    text-align: center;
    left: 0;
    bottom: 0;
    user-select: none;

    .section {
        width: 66px;
        padding: 11px 0;
        border-radius: 6px;
        svg {
            width: 1.6em;
            height: 1.6em;
        }
        .name {
            font-size: 12px;
        }
    }

    // 被选中的 section
    .section.path-active {
        position: relative;
        background-color: @wu-color-main;
        padding: 10px 0;
        border: 1px solid @wu-color-border;
        color: @wu-color-blue;
    }
    .section.path-active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 25%;
        height: 50%;
        width: 4px;
        background-color: @wu-color-blue;
        border-radius: 2px;
    }

    // 使最后一个 child 置底
    .section:last-child {
        margin-top: auto;
    }
}

main {
    --container-padding: 42px;

    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(100% - 72px);
    height: calc(100% - 54px);
    margin: 48px 0 0 72px;
    border-left: 1px solid @wu-color-border;
    border-top: 1px solid @wu-color-border;
    background-color: @wu-color-main;
    border-radius: @wu-layout-radius 0 0 0;
    text-align: left;
    box-shadow: 0px 0px 8px #00000011;
    scroll-behavior: smooth;
    overflow-y: scroll;
    flex-direction: column;
    .container {
        flex: 1 0 auto;
        padding: 24px var(--container-padding) 0;
    }
}

@media screen and (min-width: 1400px) {
    main {
        --container-padding: 9%;
    }
}
</style>
