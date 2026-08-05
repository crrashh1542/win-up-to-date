<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import ArrowDown16RegularIcon from '@iconify-vue/fluent/arrow-down-16-regular'
import ArrowRight16RegularIcon from '@iconify-vue/fluent/arrow-right-16-regular'
import Open20RegularIcon from '@iconify-vue/fluent/open-20-regular'

import DownloadEsd from '@/components/DownloadEsd.vue'
import Badge from '@/components/widgets/Badge.vue'
import Card from '@/components/widgets/Card.vue'

import { useDownloadStore } from '@/stores/apiDownload'
import type { SelfBuildItem } from '@/types'

defineOptions({ name: 'MainDownload' })

// 基线版本展开状态
const isBaselineExpanded = ref(false)

// 下载页面数据
const { download, isError } = storeToRefs(useDownloadStore())
useDownloadStore().fetchDownload()

// 自构建卡片详情页路径
const selfPath = (item: SelfBuildItem) => `/detail/${item.semester}/${item.build}`
</script>

<template>
    <div class="u-banner">下载</div>

    <template v-if="download">
        <!-- PART 1 官方 ISO -->
        <div class="u-catalog">官方 ISO 镜像</div>
        <div class="grid iso-grid">
            <a v-for="item in download.iso" :key="item.url" :href="item.url" target="_blank">
                <Card mode="flex" class="hover-outline">
                    <div class="data">
                        <div class="title">{{ item.name }}</div>
                        <div class="desc">{{ item.description }}</div>
                    </div>
                    <Open20RegularIcon width="20" height="20" />
                </Card>
            </a>
        </div>

        <!-- PART 2 自构建 ISO -->
        <div class="u-catalog">自构建 ISO 镜像</div>
        <!-- 主线 -->
        <div class="grid self-grid mainline">
            <a v-for="item in download.self.mainline" :key="item.build" :href="selfPath(item)">
                <Card mode="flex" class="grid self-card u-hoverable">
                    <div class="name">{{ item.name }}</div>
                    <div class="title">
                        <span>{{ item.build }}</span>
                        <Badge v-if="item.badge" :color="item.badge.color">{{
                            item.badge.text
                        }}</Badge>
                    </div>
                    <div class="desc">{{ item.semester }}</div>
                </Card>
            </a>
        </div>
        <!-- 基线 -->
        <div v-show="isBaselineExpanded" class="grid self-grid">
            <a v-for="item in download.self.baseline" :key="item.build" :href="selfPath(item)">
                <Card mode="flex" class="self-card u-hoverable">
                    <div class="name">{{ item.name }}</div>
                    <div class="title">
                        <span>{{ item.build }}</span>
                        <Badge v-if="item.badge" :color="item.badge.color">{{
                            item.badge.text
                        }}</Badge>
                    </div>
                    <div class="desc">{{ item.semester }}</div>
                </Card>
            </a>
        </div>
        <Card
            mode="flex"
            class="dropdown u-hoverable"
            @click="isBaselineExpanded = !isBaselineExpanded"
        >
            <span>点击{{ isBaselineExpanded ? '收起' : '展开' }} Base 版本</span>
            <ArrowDown16RegularIcon
                class="arrow"
                :class="{ expanded: isBaselineExpanded }"
                width="16"
                height="16"
            />
        </Card>

        <!-- PART 3 官方 ESD -->
        <div class="u-catalog">
            <span>官方 ESD</span>
            <router-link to="/download/esd" class="u-link">
                <Card mode="flex" class="catalog-card u-hoverable">
                    查看更多&nbsp;
                    <ArrowRight16RegularIcon width="16" height="16" />
                </Card>
            </router-link>
        </div>
        <DownloadEsd :esd="download.esd" />
    </template>

    <div v-else-if="isError" class="placeholder">加载失败，请稍后重试</div>
</template>

<style lang="less" scoped>
@card-spacing: 6px;

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: @card-spacing;
    margin-bottom: @card-spacing;
}

.card {
    align-items: center;
    justify-content: space-between;
    margin: 0;
    .desc {
        margin-top: 0.5em;
        font-size: 14px;
        color: #666;
    }
    // ESD 小标题的查看更多按钮
    &.catalog-card {
        padding: 0.5em 1em;
        font-weight: 400;
        font-size: 14px;
        color: #666;
    }
}
// 官方 ISO 的卡片添加一个 hover 效果
.hover-outline {
    transition: all 0.1s ease;
    &:hover {
        border: 1px solid @wu-color-blue;
        color: @wu-color-blue;
        * {
            color: @wu-color-blue !important;
        }
    }
}
.u-catalog {
    padding: 0.4em 0 0;
    justify-content: space-between;
}

// 自构建 ISO
.self-grid {
    .self-card {
        flex-direction: column;
        align-items: flex-start;
        display: flex;
        gap: 4px;
        margin: 0;

        .name {
            font-size: 15px;
        }
        .title {
            display: flex;
            align-items: center;
            gap: 0.33em;
            font-size: 20px;
            font-weight: 500;
        }
        .desc {
            font-size: 14px;
            margin-top: 1em;
        }
    }
}

// 自构建 ISO 展开 Base 版本
.dropdown {
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    font-size: 15px;
    .arrow {
        transition: transform 0.2s ease;
    }
    .arrow.expanded {
        transform: rotate(180deg);
    }
}

.placeholder {
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    color: #999;
}

// 桌面端自构建 iso 链接固定为 2 个
@media screen and (min-width: @wu-mobile-breakpoint) {
    .self-grid.mainline {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
