<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import Badge from '@/components/widgets/Badge.vue'
import Card from '@/components/widgets/Card.vue'
import Tablist from '@/components/widgets/Tablist.vue'
import Tab from '@/components/widgets/Tab.vue'

import icons from '@/assets/icons'
import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { MainCategory } from '@/types/data'

const pageData = reactive({
    data: [] as MainCategory[],
    isLoading: true,
})

const selectedCategory = ref<string>()

// 当前选中的分类数据
const currentCategory = computed(() => {
    return pageData.data.find((cat) => cat.id === selectedCategory.value)
})

// 请求数据
const fetchData = async () => {
    pageData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: '/category',
            method: 'get',
        })
        pageData.data = resp.content
        // 默认选中第一个分类
        if (resp.content.length > 0 && !selectedCategory.value) {
            selectedCategory.value = resp.content[0].id
        }
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
        <!-- Tab 切换 -->
        <Tablist v-model="selectedCategory">
            <Tab v-for="cat in pageData.data" :value="cat.id" :key="cat.id">
                <template #icon>
                    <img :src="icons[cat.icon]" class="icon" />
                </template>
                {{ cat.category }}
            </Tab>
        </Tablist>

        <!-- 当前分类内容 -->
        <template v-if="currentCategory">
            <!-- 内容卡片 -->
            <Card
                v-for="platform in currentCategory.platforms"
                :key="platform.name"
                :shadow="true"
            >
                <!-- 只有平台有多线开发时才显示子标题 -->
                <template v-if="platform.multi">
                    <div class="sub-title">{{ platform.name }}</div>
                    <hr />
                </template>

                <!-- 平台列表 -->
                <template v-for="(item, index) in platform.items">
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
                            item.continued ? '' : 'uncontinued',
                            item.category !== undefined
                                ? 'u-hoverable'
                                : 'disabled',
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
                                v-for="t in item.tag"
                                :key="t.name"
                                :color="t.color"
                            >
                                {{ t.name }}
                            </Badge>
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

    .tablist {
        margin-bottom: 1em;
        justify-content: space-evenly;
        .tab-button {
            column-gap: 0.5em;
        }
        .icon {
            width: 0.875em;
            height: 0.875em;
        }
    }

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
