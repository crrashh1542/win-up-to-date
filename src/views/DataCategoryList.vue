<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import request from '@/utils/request'

import Code24RegularIcon from '@iconify-vue/fluent/code-24-regular'
import Laptop24RegularIcon from '@iconify-vue/fluent/laptop-24-regular'
import SquareMultiple24RegularIcon from '@iconify-vue/fluent/square-multiple-24-regular'
import Tag24RegularIcon from '@iconify-vue/fluent/tag-24-regular'

import Card from '@/components/widgets/Card.vue'
import Spinner from '@/components/widgets/Spinner.vue'
import TopNav from '@/components/widgets/TopNav.vue'
import initDetailData from '@/utils/initDetailData'
import type { CategoryContent, NavData } from '@/types'

defineOptions({
    name: 'DataCategoryList'
})

const pageData = reactive({
    data: {} as CategoryContent,
    isLoading: true,
    versionRange: null as string | null,
    nav: null as NavData | null
})

const route = useRoute()

// utils
const formatVersionRange = (range: [string, string | null]) => {
    return range[0] + ' ~ ' + (range[1] ?? '?')
}
const getPath = (build: string) => {
    return '/detail/' + route.params.platform + '/' + build
}
// 请求数据
const fetchData = async (platform: string) => {
    pageData.isLoading = true
    try {
        const { data: resp } = await request({
            url: '/category', method: 'get', params: { platform }
        })
        initDetailData(resp, pageData)
        pageData.versionRange = formatVersionRange(resp.content.range)
    } finally {
        pageData.isLoading = false
    }
}

// 监听路由参数，重新请求数据
watch(
    () => route.params.platform as string,
    platform => { if (platform) fetchData(platform) },
    { immediate: true }
)
</script>

<template>
    <!-- 横幅 -->
    <div class="u-banner">版本列表</div>
    <div class="u-subbanner">{{ pageData.data.name }}</div>

    <!-- 加载动画 -->
    <Spinner v-if="pageData.isLoading" mode="filled" />

    <div class="wrapper" v-if="!pageData.isLoading">
        <!-- 快速导航 -->
        <TopNav :data="pageData.nav" />

        <!-- 基本信息 -->
        <Card class="overview" mode="block">
            <div class="line-left">
                <p>
                    <Laptop24RegularIcon width="22" height="22" />
                    平台代号 / {{ pageData.data.codename }}
                </p>
                <p>
                    <Code24RegularIcon width="22" height="22" />
                    开发周期 / {{ pageData.data.semester }}
                </p>
            </div>
            <div>
                <p>
                    <Tag24RegularIcon width="22" height="22" />
                    版本范围 / {{ pageData.versionRange }}
                </p>
                <p>
                    <SquareMultiple24RegularIcon width="22" height="22" />
                    分类归属 / {{ pageData.data.belonging }}
                </p>
            </div>
        </Card>

        <!-- 数据表 -->
        <Card mode="block" class="data">
            <div class="row">
                <span class="left">版本</span>
                <span class="right">发布日期</span>
            </div>
            <router-link class="row" v-for="r in pageData.data.list" :key="r[0]" :to="getPath(r[0])">
                <span class="left">{{ r[0] }}</span>
                <span class="right">{{ r[1] }}</span>
            </router-link>
        </Card>

    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');
.overview {
    display: var(--v-detail-overview);
    .line-left {
        width: var(--v-detail-overview-width);
    }
    p {
        display: flex;
        align-items: center;
        gap: 6px;
    }
}
.data {
    padding: 0;
    font-size: 1rem;

    .row {
        padding: 12px calc(18px + 1.2%);
        display: flex;
        border-bottom: 1px solid @wu-color-border;
        transition: background-color 0.2s ease;
        .left { flex: 0 0 40%; }
        .right { flex: 0 0 60%; }
    }
    a.row:hover {
        background-color: @wu-color-base;
    }
}

// 响应式 ---- 移动端
@media screen and (max-width: 700px) {
   .wrapper { // v代表view
      --v-detail-overview: block;
      --v-detail-overview-width: 100%;
   }
}

// 响应式 ---- PC
@media screen and (min-width: 700px) {
   .wrapper {
      --v-detail-overview: flex;
      --v-detail-overview-width: 50%;
   }
}
</style>
