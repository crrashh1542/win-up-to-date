<script setup lang="ts">
import { reactive } from 'vue'
import request from '@/utils/request'
import NProgress from '@/utils/progress'

// 引入组件
import Badge from '@/components/widgets/Badge.vue'
import Card from '@/components/widgets/Card.vue'

import icons from '@/assets/icons'
import type { MainCategory, BuiltInColor } from '@/types/data'

// tag 名称到颜色的映射表（基于 category.json 中的实际数据）
const tagColorMap: Record<string, BuiltInColor> = {
    Experimental: 'yellow',
    Canary: 'amber',
    Beta: 'green',
    RP: 'purple',
    正式: 'blue',
    Dev: 'orange',
    LTSC: 'teal',
    Fast: 'yellow',
}

const getTagColor = (tag: string): BuiltInColor => tagColorMap[tag] ?? 'blue'

const pageData = reactive({
    data: [] as MainCategory[],
    isLoading: true,
})

// 请求数据
const fetchData = async () => {
    pageData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: '/category/list',
            method: 'get',
        })
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
                <img :src="icons[cat.icon]" class="u-box-s u-icon" />&nbsp;
                {{ cat.category }}
            </div>

            <!-- 内容卡片 -->
            <Card
                v-for="platform in cat.platforms"
                :key="platform.name"
                :shadow="true"
            >
                <!-- 只有平台有多线开发时才显示子标题 -->
                <template v-if="platform.multi">
                    <div class="sub-title">{{ platform.name }}</div>
                    <hr />
                </template>

                <!-- 平台列表 -->
                <template v-for="(item, index) in platform.items" :key="index">
                    <!-- 从第 1 项开始显示分割线 -->
                    <hr v-if="index > 0" />
                    <!-- 如果 item 有 category，则使用 router-link 并添加 hover 效果，否则 div -->
                    <component
                        :is="
                            item.category !== undefined ? 'router-link' : 'div'
                        "
                        v-bind="
                            item.category !== undefined
                                ? { to: `/category/${item.category}` }
                                : {}
                        "
                        :class="[
                            'container',
                            item.category !== undefined
                                ? 'u-hoverable'
                                : 'disabled',
                            item.continued ? '' : 'uncontinued',
                        ]"
                    >
                        <div class="info">
                            <div class="codename">
                                {{
                                    item.name === 'default'
                                        ? platform.name
                                        : item.name
                                }}
                            </div>
                            <div class="version">
                                {{ item.semester }} {{ item.latestBuild }}
                            </div>
                        </div>
                        <div class="badges">
                            <Badge
                                v-for="t in item.tags"
                                :key="t"
                                :color="getTagColor(t)"
                                >{{ t }}</Badge
                            >
                        </div>
                    </component>
                </template>
            </Card>
        </template>
    </div>
</template>

<style lang="less" scoped>
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

        &.disabled {
            // 没有 category
            cursor: not-allowed;
        }
        &.uncontinued {
            // 已停止维护
            opacity: 0.6;
        }
    }
}
</style>
