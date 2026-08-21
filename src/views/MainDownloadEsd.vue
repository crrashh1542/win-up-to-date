<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import DownloadEsd from '@/components/DownloadEsd.vue'
import Tab from '@/components/widgets/Tab.vue'
import Tablist from '@/components/widgets/Tablist.vue'

import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { DownloadEsdCategory, DownloadEsdItem } from '@/types/data'

const menuData = reactive({
    data: [] as DownloadEsdCategory[],
    isLoading: true,
})
const pageData = reactive({
    data: [] as DownloadEsdItem[],
    isLoading: true,
})
const selectedValue = ref<string>()
const currentValueName = computed(() => {
    return menuData.data.find((cat) => cat.value === selectedValue.value)?.name
})

// 获取 Tab 的目录
const fetchMenu = async () => {
    menuData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: '/download/esd',
            method: 'get',
        })
        menuData.data = resp.content
        if (resp.content.length > 0) {
            selectedValue.value = resp.content[0].value
        }
    } catch (error) {
        console.error(error)
    } finally {
        menuData.isLoading = false
        NProgress.done()
    }
}

// data
const fetchData = async (value: string) => {
    pageData.isLoading = true
    try {
        const { data: resp } = await request({
            url: `/download/esd/${value}`,
            method: 'get',
        })
        pageData.data = resp.content
    } catch (error) {
        console.error(error)
    } finally {
        pageData.isLoading = false
    }
}

fetchMenu()

// 监听 selectedValue 的变化，更新页面数据
watch(selectedValue, (value) => {
    if (value) fetchData(value)
})
</script>

<template>
    <div class="u-banner">下载官方 ESD</div>
    <div class="u-subbanner">{{ currentValueName }}</div>

    <div class="esd" v-if="!menuData.isLoading">
        <Tablist v-model="selectedValue">
            <Tab v-for="cat in menuData.data" :value="cat.value" :key="cat.value">
                {{ cat.name }}
            </Tab>
        </Tablist>

        <DownloadEsd v-if="!pageData.isLoading" :esd="pageData.data" />
    </div>
</template>

<style lang="less" scoped>
.esd {
    :deep(.tablist) {
        margin-bottom: 6px;
    }
}
</style>
