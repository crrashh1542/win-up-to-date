<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/utils/request'

import Box24RegularIcon from '@iconify-vue/fluent/box-24-regular'
import Branch24RegularIcon from '@iconify-vue/fluent/branch-24-regular'
import Clock24RegularIcon from '@iconify-vue/fluent/clock-24-regular'
import Code24RegularIcon from '@iconify-vue/fluent/code-24-regular'
import DesktopArrowDown24RegularIcon from '@iconify-vue/fluent/desktop-arrow-down-24-regular'
import DeveloperBoard24RegularIcon from '@iconify-vue/fluent/developer-board-24-regular'
import Search24RegularIcon from '@iconify-vue/fluent/search-24-regular'
import Tag24RegularIcon from '@iconify-vue/fluent/tag-24-regular'
import MegaphoneLoud24RegularIcon from '@iconify-vue/fluent/megaphone-loud-24-regular'

import Card from '@/components/widgets/Card.vue'
import Code from '@/components/widgets/Code.vue'
import LoadAnim from '@/components/widgets/LoadAnim.vue'
import TopNav from '@/components/widgets/TopNav.vue'
import initDetailData from '@/utils/initDetailData'

defineOptions({
    name: 'DataDetail'
})

interface DetailData {
    build: {
        number: string
        branch: string
        compileTime: string
        arch: string[]
        counterpart: string
    }
    belongsTo: { name: string; path: string }
    release?: { channel: string; time: string; url: string; announcePlace: string }
    featureIds?: { url: string; fileName: string }
    updateId?: { arch: string; id: string }[]
    download?: { name: string; arch: string; link: { url: string; source: string }[]; md5: string; sha256: string }
}

const pageData = reactive({
    data: { build: {} } as DetailData,
    isLoading: true,
    nav: null as any
})

const router = useRouter()
const route = useRoute()

const fetchData = async (platform: string, build: string) => {
    pageData.isLoading = true
    try {
        const { data: resp } = await request({
            url: '/detail', method: 'get', params: { platform, build }
        })
        initDetailData(resp, pageData)
    } catch (err: any) {
        if (err.response?.status === 404) {
            router.replace('/404')
        } else {
            console.error('加载数据失败:', err)
        }
    } finally {
        pageData.isLoading = false
    }
}

watch(
    () => [route.params.platform, route.params.build] as string[],
    ([platform, build]) => { if (platform && build) fetchData(platform, build) },
    { immediate: true }
)

const getBelongingRoute = (value: string) => {
    return '/category/' + value
}
</script>

<template>
    <!-- 横幅 -->
    <div class="u-banner">版本详情</div>
    <div class="u-subbanner">{{ pageData.data.build.number }}</div>

    <!-- 加载动画 -->
    <LoadAnim v-if="pageData.isLoading" mode="filled" />

    <div class="wrapper" v-if="!pageData.isLoading">
        <!-- 快速导航 -->
        <TopNav :data="pageData.nav" />

        <!-- 一览卡片 -->
        <Card class="overview">
            <div class="line-left">
                <p>
                    <Tag24RegularIcon width="22" height="22" />
                    构建版号 / {{ pageData.data.build.number }}
                </p>
                <p>
                    <Branch24RegularIcon width="22" height="22" />
                    构建分支 / {{ pageData.data.build.branch }}
                </p>
                <p>
                    <Clock24RegularIcon width="22" height="22" />
                    编译时间 / {{ pageData.data.build.compileTime }}
                </p>
            </div>
            <div>
                <p>
                    <DeveloperBoard24RegularIcon width="22" height="22" />
                    系统架构 /
                    <span v-for="i in pageData.data.build.arch" :key="i">{{ i }}&nbsp;&nbsp;</span>
                </p>
                <p>
                    <Search24RegularIcon width="22" height="22" />
                    推送平台 / {{ pageData.data.build.counterpart }}
                </p>
                <p>
                    <Code24RegularIcon width="22" height="22" />
                    构建归属 /
                    <router-link :to="getBelongingRoute(pageData.data.belongsTo.path)">
                        {{ pageData.data.belongsTo.name }}
                    </router-link>
                </p>
            </div>
        </Card>

        <!-- 发版信息卡片 -->
        <Card mode="block">
            <div class="u-catalog">
                <MegaphoneLoud24RegularIcon width="28" height="28" />
                发版信息
            </div>

            <div v-if="pageData.data.release !== undefined">
                <p v-if="pageData.data.release.channel !== undefined">
                    推送频道：{{ pageData.data.release.channel }}
                </p>
                <p v-if="pageData.data.release.channel !== undefined">
                    推送时间：{{ pageData.data.release.time }} (UTC)
                </p>
                <p v-if="pageData.data.release.url !== undefined">
                    官方发版日志：
                    <a target="_blank" :href="pageData.data.release.url">
                        {{ pageData.data.release.announcePlace }}</a>
                </p>
                <p v-if="pageData.data.featureIds !== undefined">
                    ViveID 列表：
                    <a target="_blank" :href="pageData.data.featureIds.url">
                        {{ pageData.data.featureIds.fileName }}</a>
                </p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可获取的发版信息</p>
            </div>
        </Card>

        <!-- 下载 UUP -->
        <Card mode="block">
            <div class="u-catalog">
                <DesktopArrowDown24RegularIcon width="28" height="28" />
                从 UUP 获取构建
            </div>

            <div v-if="pageData.data.updateId !== undefined && pageData.data.updateId.length > 0">
                <p class="u-para-code" v-for="id in pageData.data.updateId" :key="id.arch">
                    {{ id.arch }}：<Code :value="id.id" is-copiable=true />
                </p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可获取的 UUP 信息</p>
            </div>
        </Card>

        <!-- 下载 ISO -->
        <Card mode="block">
            <div class="u-catalog">
                <Box24RegularIcon width="28" height="28" />
                下载 ISO / 更新包
            </div>

            <div v-if="pageData.data.download !== undefined && Object.keys(pageData.data.download).length > 0">
                <p>文件名称：{{ pageData.data.download.name }}</p>
                <p>系统架构：{{ pageData.data.download.arch }}</p>
                <p>
                    下载地址：
                    <span v-for="(l, index) in pageData.data.download.link" :key="index">
                        <a target="_blank" :href="l.url">{{ l.source }}</a>
                        &nbsp;&nbsp;&nbsp;
                    </span>
                </p>
                <p class="u-para-code">MD5：<Code :value="pageData.data.download.md5" is-break-word=true is-copiable=true /></p>
                <p class="u-para-code">SHA-256：<Code :value="pageData.data.download.sha256" is-break-word=true is-copiable=true /></p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可供下载的内容</p>
            </div>
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
.placeholder {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
