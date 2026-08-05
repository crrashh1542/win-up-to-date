<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Code24RegularIcon from '@iconify-vue/fluent/code-24-regular'
import CloudDownload24RegularIcon from '@iconify-vue/fluent/cloud-download-24-regular'
import Library24RegularIcon from '@iconify-vue/fluent/library-24-regular'
import Settings24RegularIcon from '@iconify-vue/fluent/settings-24-regular'
import Tag24RegularIcon from '@iconify-vue/fluent/tag-24-regular'

import Badge from './widgets/Badge.vue'
import Tab from './widgets/Tab.vue'
import Tablist from './widgets/Tablist.vue'
import Foo from './Footer.vue'
import Search from './SearchBox.vue'

import type { BuildInfo, BuiltInColor } from '@/types'
import buildInfo from '../../scripts/buildInfo.json'

const route = useRoute()
defineOptions({ name: 'PageWrapper' })

// 标题旁的 badge
const buildBadge = computed<{ text: string; color: BuiltInColor } | null>(() => {
    const meta = buildInfo as BuildInfo
    if (meta.ci) return { text: 'CI', color: 'blue' }
    if (meta.beta) return { text: 'Beta', color: 'green' }
    return null
})

// 导航选中状态，与当前路由前缀同步
const selectedNav = computed(() => {
    const path = route.path
    if (path.startsWith('/feature-id')) return '/feature-id'
    if (path.startsWith('/category')) return '/category'
    return path
})
</script>

<template>
    <!-- Part 1 ---- 顶部导航栏 -->
    <div class="topbar">
        <div class="title">
            <router-link to="/" class="name">Windows Up-to-Date</router-link>
            <Badge
                v-if="buildBadge"
                class="build-badge"
                :color="buildBadge.color"
                variant="outlined"
            >
                {{ buildBadge.text }}
            </Badge>
        </div>
        <div class="search">
            <Search />
        </div>
        <div class="about">
            <!-- <Info24RegularIcon @click="openAbout" /> -->
        </div>
    </div>

    <!-- Part 2 ---- 左侧（移动端底部）导航栏 -->
    <Tablist v-model="selectedNav" vertical>
        <Tab value="/" to="/">
            <template #icon>
                <Tag24RegularIcon />
            </template>
            版本
        </Tab>
        <Tab value="/category" to="/category">
            <template #icon>
                <Library24RegularIcon />
            </template>
            平台
        </Tab>
        <Tab value="/feature-id" to="/feature-id">
            <template #icon>
                <Code24RegularIcon />
            </template>
            功能 ID
        </Tab>
        <Tab value="/download" to="/download">
            <template #icon>
                <CloudDownload24RegularIcon />
            </template>
            下载
        </Tab>
        <Tab value="/settings" to="/settings">
            <template #icon>
                <Settings24RegularIcon />
            </template>
            设置
        </Tab>
    </Tablist>

    <!-- Part 3 ---- 主体部分 -->
    <main>
        <!-- 此处 container 撑满 main 内的剩余空间，内容不足时 Footer 被推到页面底部 -->
        <div class="container">
            <slot />
        </div>
        <Foo />
    </main>
</template>

<style lang="less" scoped>
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: @wu-layout-topbar-height;
    padding: 0 (@wu-layout-sidenav-padding-y + @wu-layout-sidenav-space);
    font-size: 18px;
    user-select: none;

    .title {
        flex: 0 0 auto;

        .name {
            color: #222;
            font-weight: 600;
        }

        .build-badge {
            margin-left: 8px;
        }
    }

    .about {
        flex: 0 0 auto;
        cursor: pointer;

        svg {
            width: 1.2em;
            height: 1.2em;
        }
    }
}

@media screen and (min-width: 700px) {
    .topbar .search {
        flex: 0 0 auto;
        margin-right: 10%;
    }
}

// 左侧导航栏
.tablist {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: @wu-layout-sidenav-space;
    position: absolute;
    height: calc(100% - @wu-layout-topbar-height);
    width: @wu-layout-sidenav-width;
    padding: @wu-layout-sidenav-space;
    text-align: center;
    left: 0;
    bottom: 0;
    user-select: none;
    flex-direction: column;
    gap: @wu-layout-sidenav-space;
}

.tab-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8em;
    width: (@wu-layout-sidenav-width - @wu-layout-sidenav-space * 2);
    padding: @wu-layout-sidenav-padding-x @wu-layout-sidenav-padding-y;
    border-radius: 6px;
    font-size: 15px;

    .tab-icon {
        width: 1.4em;
        height: 1.4em;
        font-size: 1em;

        svg {
            width: 1.4em;
            height: 1.4em;
        }
    }

    .tab-content {
        padding: 0;
    }

    // 被选中的 tab
    &.selected {
        position: relative;
        background-color: @wu-color-main;
        padding: (@wu-layout-sidenav-padding-x - 1px) (@wu-layout-sidenav-padding-y - 1px); // 由于被选中后会有个 1px 的 border，所以减去 1px
        border: 1px solid @wu-color-border;
        color: @wu-color-blue;
        .tab-content {
            color: @wu-color-blue;
        }
    }
    // hover
    &:hover {
        background-color: @wu-color-main !important; // 去除 tablist 默认 hover 背景色
    }
    &:not(.selected):hover {
        background-color: darken(@wu-color-base, 3%);
    }
}

// 使最后一个 child 置底
.tablist > :last-child {
    margin-top: auto;
}

main {
    --container-padding: 42px;

    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(100% - @wu-layout-sidenav-width);
    height: calc(100% - @wu-layout-topbar-height);
    margin: @wu-layout-topbar-height 0 0 @wu-layout-sidenav-width;
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
        --container-padding: 8%;
    }
}
</style>
