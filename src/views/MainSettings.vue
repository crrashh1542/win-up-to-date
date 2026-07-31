<script setup lang="ts">
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'

import Branch24RegularIcon from '@iconify-vue/fluent/branch-24-regular'
import Calendar24RegularIcon from '@iconify-vue/fluent/calendar-24-regular'
import Chat24RegularIcon from '@iconify-vue/fluent/chat-24-regular'
import Code24RegularIcon from '@iconify-vue/fluent/code-24-regular'
import LaptopSettings24RegularIcon from '@iconify-vue/fluent/laptop-settings-24-regular'
import Search24RegularIcon from '@iconify-vue/fluent/search-24-regular'
import WeatherMoon24RegularIcon from '@iconify-vue/fluent/weather-moon-24-regular'

import Card from '@/components/widgets/Card.vue'
import Switch from '@/components/widgets/Switch.vue'
import aboutInfo from '@/utils/parseRepoInfo'
import { useSettingsStore } from '@/stores/settings'
import type { SettingsMenu } from '@/types'

const icons: Record<string, Component> = {
    'weather-moon': WeatherMoon24RegularIcon,
    'laptop-settings': LaptopSettings24RegularIcon,
    branch: Branch24RegularIcon,
    calendar: Calendar24RegularIcon,
    search: Search24RegularIcon,
    code: Code24RegularIcon,
    chat: Chat24RegularIcon,
}

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const settingsMenu: SettingsMenu = [
    {
        name: '全局设置',
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
        name: '主页设置',
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
]
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
            <Switch
                :is-disabled="!item.enabled"
                v-model="settings[item.value]"
            />
        </Card>
    </template>

    <div class="u-catalog">关于</div>

    <p>
        如你所见，这是一个反映 Windows
        系统各版本情况实时进展的统计<s>和一堆其它莫名其妙功能混一起的</s>站点。
    </p>
    <p>
        作者云萧自身也是一个 Windows Insider
        爱好者，若你喜欢这个项目，给项目点个小星星吧！=≡Σ((( つ•̀ω•́)つ
    </p>

    <!-- 有外部链接时渲染 a 标签，否则渲染 div -->
    <component
        v-for="item in aboutInfo"
        :key="item.label"
        :is="item.link ? 'a' : 'div'"
        :href="item.link"
        :target="item.link ? '_blank' : undefined"
    >
        <Card mode="flex">
            <span class="item">
                <component :is="icons[item.icon]" width="24" height="24" />
                {{ item.label }}
            </span>
            <span class="value">{{ item.value }}</span>
        </Card>
    </component>

    <p>
        本项目数据托管于<a
            href="https://github.com/crrashh1542/win-up-to-date/tree/data"
            target="_blank"
            >公共维护的仓库</a
        >。 项目遵循
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
            >GPL-3.0 开源协议</a
        >，并仅限于作展示和交流学习用途。
    </p>

    <p>
        本项目与 Microsoft Corporation 无关，Windows 为 Microsoft Corporation
        的注册商标。项目首页采用的图标来自
        <a href="https://www.iconfont.cn">iconfont</a>，其余所有图标均来自
        <a href="https://github.com/microsoft/fluentui-system-icons"
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
