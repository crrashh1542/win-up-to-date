<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'

import AlignBottom24RegularIcon from '@iconify-vue/fluent/align-bottom-24-regular'
import Branch24RegularIcon from '@iconify-vue/fluent/branch-24-regular'
import Calendar24RegularIcon from '@iconify-vue/fluent/calendar-24-regular'
import Chat24RegularIcon from '@iconify-vue/fluent/chat-24-regular'
import LockClosed24RegularIcon from '@iconify-vue/fluent/lock-closed-24-regular'
import Code24RegularIcon from '@iconify-vue/fluent/code-24-regular'
import Info24RegularIcon from '@iconify-vue/fluent/info-24-regular'
import LaptopSettings24RegularIcon from '@iconify-vue/fluent/laptop-settings-24-regular'
import WeatherMoon24RegularIcon from '@iconify-vue/fluent/weather-moon-24-regular'

import Card from '@/components/widgets/Card.vue'
import Switch from '@/components/widgets/Switch.vue'
import { repoVersion, build, repoUrl, repoName } from '@/utils/parseRepoInfo'

import { useBuildsStore } from '@/stores/apiLatestBuilds'
import { useSettingsStore } from '@/stores/settings'
import type { SettingsMenu, AboutMenu } from '@/types'

const icons: Record<string, Component> = {
    branch: Branch24RegularIcon,
    calendar: Calendar24RegularIcon,
    chat: Chat24RegularIcon,
    chart: AlignBottom24RegularIcon,
    code: Code24RegularIcon,
    lock: LockClosed24RegularIcon,
    info: Info24RegularIcon,
    'laptop-settings': LaptopSettings24RegularIcon,
    'weather-moon': WeatherMoon24RegularIcon,
}

// 获取网站数据版本
const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
const { dataVersion } = storeToRefs(useBuildsStore())
useBuildsStore().fetchDataVersion()

const dataHash = computed(() => dataVersion.value?.hash ?? 'unknown')
const dataDate = computed(() => dataVersion.value?.date ?? 'unknown')

const settingsMenu: SettingsMenu[] = [
    {
        name: '全局',
        id: 0,
        items: [
            {
                name: '启用深色模式 (TODO)',
                icon: 'weather-moon',
                value: 'isDarkMode',
                enabled: false,
            },
        ],
    },
    {
        name: '主页',
        id: 1,
        items: [
            {
                name: '显示开发周期及代号',
                icon: 'laptop-settings',
                value: 'isShowFlight',
                enabled: true,
            },
            {
                name: '显示分支',
                icon: 'branch',
                value: 'isShowBranch',
                enabled: true,
            },
            {
                name: '显示发布日期',
                icon: 'calendar',
                value: 'isShowDate',
                enabled: true,
            },
        ],
    },
    {
        name: '下载',
        id: 2,
        items: [
            {
                name: 'ESD 下载链接启用 HTTPS',
                icon: 'lock',
                value: 'isEsdHttps',
                enabled: true,
            },
        ],
    },
]

// 依赖 dataVersion（异步加载），需要 computed 才能在数据就绪后刷新
const aboutMenu = computed<AboutMenu[]>(() => [
    {
        name: '应用版本',
        icon: 'info',
        value: `v${repoVersion} (build ${build})`,
    },
    {
        name: '当前数据版本',
        icon: 'chart',
        value: `${dataDate.value} (${dataHash.value})`,
        link: `https://github.com/crrashh1542/win-up-to-date-data/commit/${dataHash.value}`,
    },
    {
        name: '开源地址',
        icon: 'code',
        value: repoName,
        link: repoUrl,
    },
    {
        name: '交流 QQ 群',
        icon: 'chat',
        value: '442133970',
        link: 'https://qm.qq.com/q/UAI4de5OM0',
    },
])
</script>

<template>
    <div class="u-banner">设置</div>

    <template v-for="i in settingsMenu" :key="i.id">
        <!-- 小标题 -->
        <div class="u-catalog">{{ i.name }}</div>

        <!-- 卡片 -->
        <Card mode="flex" v-for="item in i.items" :key="item.value">
            <span class="item">
                <component :is="icons[item.icon]" width="24" height="24" />
                {{ item.name }}
            </span>
            <Switch :is-disabled="!item.enabled" v-model="settings[item.value]" />
        </Card>
    </template>

    <div class="u-catalog">关于</div>

    <p>
        如你所见，这是一个反映 Windows
        系统各版本情况实时进展的统计<s>和一堆其它莫名其妙功能的</s>站点。如果觉得不错，给项目点个小星星吧！=≡Σ(((
        つ•̀ω•́)つ
    </p>

    <!-- 有外部链接时渲染 a 标签，否则渲染 div -->
    <component
        v-for="item in aboutMenu"
        :key="item.name"
        :is="item.link ? 'a' : 'div'"
        :href="item.link"
        :target="item.link ? '_blank' : undefined"
        :rel="item.link ? 'noopener noreferrer' : undefined"
    >
        <Card mode="flex" :class="item.link ? 'u-hoverable' : ''">
            <span class="item">
                <component :is="icons[item.icon]" width="24" height="24" />
                {{ item.name }}
            </span>
            <span class="value">{{ item.value }}</span>
        </Card>
    </component>

    <p>
        本项目遵循
        <a
            href="https://www.gnu.org/licenses/gpl-3.0.en.html"
            target="_blank"
            rel="noopener noreferrer"
            >GPL-3.0 开源协议</a
        >，仅限用作展示和交流学习。本项目与 Microsoft Corporation 无关，Windows 是 Microsoft
        Corporation 的注册商标。项目首页采用的图标来自
        <a href="https://www.iconfont.cn" target="_blank" rel="noopener noreferrer">iconfont</a
        >，其余图标均来自
        <a
            href="https://github.com/microsoft/fluentui-system-icons"
            target="_blank"
            rel="noopener noreferrer"
            >Fluent UI System Icons</a
        >。
    </p>
</template>

<style lang="less" scoped>
.card {
    font-size: 15px;
    justify-content: space-between;

    // 关于区块：链接行包裹层，整行铺满并左右分布
    // > a,
    // > div {
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //     flex: 1;
    // }
}

// 设置项行
.item {
    display: flex;
    align-items: center;
    gap: 0.8em;
    line-height: 36px; // 算上 Switch 组件的高度
}

.value {
    color: #666;
}
</style>
