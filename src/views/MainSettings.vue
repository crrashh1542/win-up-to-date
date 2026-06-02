<script setup lang="ts">
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'

import Calendar24RegularIcon from '@iconify-vue/fluent/calendar-24-regular'
import WeatherMoon24RegularIcon from '@iconify-vue/fluent/weather-moon-24-regular'
import LaptopSettings24RegularIcon from '@iconify-vue/fluent/laptop-settings-24-regular'
import Branch24RegularIcon from '@iconify-vue/fluent/branch-24-regular'

import Card from '@/components/widgets/Card.vue'
import Switch from '@/components/widgets/Switch.vue'
import { useSettingsStore } from '@/stores/settings'
import type { SettingsMenu } from '@/types'

const icons: Record<string, Component> = {
    'weather-moon': WeatherMoon24RegularIcon,
    'laptop-settings': LaptopSettings24RegularIcon,
    'branch': Branch24RegularIcon,
    'calendar': Calendar24RegularIcon,
}

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)

const settingsMenu: SettingsMenu = [
    {
        name: '全局设置',
        id: 0,
        items: [{
            name: '启用深色模式 (TODO)',
            icon: 'weather-moon',
            value: 'isDarkMode',
            enabled: false
        }]
    },
    {
        name: '主页设置',
        id: 1,
        items: [{
            name: '显示开发周期及代号',
            icon: 'laptop-settings',
            value: 'isShowFlight',
            enabled: true
        },
        {
            name: '显示分支',
            icon: 'branch',
            value: 'isShowBranch',
            enabled: true
        },
        {
            name: '显示发布日期',
            icon: 'calendar',
            value: 'isShowDate',
            enabled: true
        }]
    },
]
</script>


<template>
    <div class="u-banner">设置</div>


    <div v-for="i in settingsMenu" :key="i.id">
        <!-- 小标题 -->
        <div class="u-catalog">{{ i.name }}</div>

        <!-- 卡片 -->
        <card mode="flex" v-for="item in i.items" :key="item.value">
            <span class="item">
                <component :is="icons[item.icon]" width="24" height="24" />
                {{ item.name }}
            </span>
            <span class="u-grow"></span>
            <Switch :is-disabled="!item.enabled" v-model="settings[item.value]" />
        </card>
    </div>
</template>

<style lang="less" scoped>
.item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .8em;
}
</style>
