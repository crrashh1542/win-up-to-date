<script setup lang="ts">
import { reactive } from 'vue'
import request from '@/utils/request'
import NProgress from '@/utils/progress'

// 引入组件
import Badge from '@/components/widgets/Badge.vue'
import Card from '@/components/widgets/Card.vue'

import icons from '@/assets/icons'
import type { MainCategory } from '@/types/data'

const pageData = reactive({
    data: [] as MainCategory[],
    isLoading: true,
})

// 请求数据
const fetchData = async () => {
    pageData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({ url: '/category/list', method: 'get' })
        pageData.data = resp.content
    } catch (error) {
        console.error(error)
    } finally {
        pageData.isLoading = false
        NProgress.done()
    }
}
fetchData()
</script>

<template>
    <div class="u-banner">平台</div>

    <div class="category" v-if="!pageData.isLoading">

        <template v-for="cat in pageData.data" :key="cat.id">
            <!-- 小标题 -->
            <div class="u-catalog">
                <img :src="icons[cat.icon]" class="u-box-s u-icon">&nbsp;
                {{ cat.category }}
            </div>

            <!-- 内容卡片 -->
            <Card v-for="platform in cat.platforms" :key="platform.name">
                <template v-if="platform.multi">
                    <div class="sub-title">{{ platform.name }}</div>
                    <hr />
                </template>

                <template v-for="(item, index) in platform.items" :key="item.category">
                    <hr v-if="index > 0" />
                    <router-link :to="`/category/${item.category}`" class="container">
                        <div class="info">
                            <div class="codename">{{ item.name === 'default' ? platform.name : item.name }}</div>
                            <div class="version">{{ item.semester }} {{ item.latestBuild }}</div>
                        </div>
                        <div class="badges">
                            <Badge v-for="t in item.tag" :key="t.name" :color="t.color">{{ t.name }}</Badge>
                        </div>
                    </router-link>
                </template>
            </Card>
        </template>
    </div>

</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.category {
    display: flex;
    flex-direction: column;
    gap: 6px;

    // 由于会出现多个 item 的情况，所以移除 card 上的 padding，放到 container 上
    // 否则 hr 宽度无法占满整个 card，且部分地方点击不到
    .card {
        margin: 0;
        padding: 0;
    }

    .sub-title {
        font-size: 18px;
        font-weight: 500;
        margin: @wu-layout-card-padding-y @wu-layout-card-padding-x;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: @wu-layout-card-padding-y @wu-layout-card-padding-x;
        line-height: 1.6;

        .codename {
            font-size: 18px;
            font-weight: 500;
        }

        .version {
            font-size: 15px;
            color: @wu-color-text-accent;
        }

        .badges {
            display: flex;
            gap: 4px;
            margin-right: @wu-layout-card-padding-x;
        }
    }
}
</style>
