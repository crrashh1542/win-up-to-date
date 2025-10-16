<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

import { Icon } from '@iconify/vue'
import Card from '@/components/widgets/Card.vue'
import Switch from '@/components/widgets/Switch.vue'

const settingsStore = useSettingsStore()
const { settings } = storeToRefs(settingsStore)
const updateSetting = (key, value) => {
    settingsStore.settings[key] = value
    console.log(key, settingsStore.settings[key]);
    
}

document.title = '设置 / Windows Up-to-Date'
const settingsMenu = [
    {
        name: '全局设置',
        id: 0,
        items: [{
            name: '启用深色模式',
            icon: 'weather-moon',
            value: 'isDarkMode',
            isDisabled: true
        }]
    },
    {
        name: '主页设置',
        id: 1,
        items: [{
            name: '显示开发周期及代号',
            icon: 'laptop-settings',
            value: 'isShowFlight',
            isDisabled: false
        },
        {
            name: '显示分支',
            icon: 'branch',
            value: 'isShowBranch',
            isDisabled: false
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
                <Icon :icon="'fluent:' + item.icon + '-24-regular'" width="24" height="24" />
                {{ item.name }}
            </span>
            <span class="u-grow"></span>
            <Switch :is-disabled="item.isDisabled" :is-checked="settings[item.value]"
                    @change="updateSetting(item.value, $event.target.checked)" />
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