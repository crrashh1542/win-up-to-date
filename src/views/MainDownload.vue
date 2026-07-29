<script setup lang="ts">
import { ref } from 'vue'
import ArrowDown20RegularIcon from '@iconify-vue/fluent/arrow-down-20-regular'
import Open20RegularIcon from '@iconify-vue/fluent/open-20-regular'

import Badge from '@/components/widgets/Badge.vue'
import Button from '@/components/widgets/Button.vue'
import Card from '@/components/widgets/Card.vue'
import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { DownloadContent, SelfBuildItem } from '@/types'

defineOptions({ name: 'MainDownload' })

// 基线版本展开状态
const isBaselineExpanded = ref(false)

// 下载页面数据
const download = ref<DownloadContent | null>(null)
const isError = ref(false)

const fetchData = async () => {
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: '/download',
            method: 'get',
        })
        download.value = resp.content
    } catch {
        isError.value = true
    } finally {
        NProgress.done()
    }
}
fetchData()

// 自构建卡片详情页路径
const selfPath = (item: SelfBuildItem) =>
    `/detail/${item.semester}/${item.build}`
</script>

<template>
    <div class="u-banner">下载</div>

    <template v-if="download">
        <div class="u-catalog">官方 ISO 镜像</div>
        <div class="iso-grid">
            <a
                v-for="item in download.iso"
                :key="item.url"
                :href="item.url"
                target="_blank"
            >
                <Card mode="flex" class="hover-outline">
                    <div class="data">
                        <div class="title">{{ item.name }}</div>
                    </div>
                    <Open20RegularIcon width="20" height="20" />
                </Card>
            </a>
        </div>

        <div class="u-catalog">自构建 ISO</div>
        <div class="self-grid">
            <a
                v-for="item in download.self.mainline"
                :key="item.build"
                :href="selfPath(item)"
            >
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

        <div v-show="isBaselineExpanded" class="self-grid">
            <a
                v-for="item in download.self.baseline"
                :key="item.build"
                :href="selfPath(item)"
            >
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
            <span
                >点击{{ isBaselineExpanded ? '收起' : '展开' }} Base 版本</span
            >
            <ArrowDown20RegularIcon
                class="dropdown-arrow"
                :class="{ 'is-expanded': isBaselineExpanded }"
                width="16"
                height="16"
            />
        </Card>

        <div class="u-catalog">官方 ESD</div>
        <div class="esd-grid">
            <Card v-for="item in download.esd" :key="item.name" mode="flex">
                <div class="data">
                    <div class="title">{{ item.name }}</div>
                </div>
                <div class="links">
                    <a
                        v-for="link in item.links"
                        :key="link.name"
                        :href="link.url"
                        target="_blank"
                    >
                        <Button variant="outlined" color="blue">{{
                            link.name
                        }}</Button>
                    </a>
                </div>
            </Card>
        </div>
    </template>

    <div v-else-if="isError" class="placeholder">加载失败，请稍后重试</div>
</template>

<style lang="less" scoped>
@card-spacing: 6px;

.iso-grid,
.esd-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: @card-spacing;
    margin-bottom: @card-spacing;

    .card {
        align-items: center;
        justify-content: space-between;
        margin: 0;
    }

    button {
        margin-left: 0.33em;
    }
}

.self-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: @card-spacing;
    margin-bottom: @card-spacing;

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

.dropdown {
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
    font-size: 15px;

    .dropdown-arrow {
        transition: transform 0.2s ease;
    }
    .dropdown-arrow.is-expanded {
        transform: rotate(180deg);
    }
}

.hover-outline {
    transition: all 0.1s ease;
    &:hover {
        border: 1px solid @wu-color-blue;
        color: @wu-color-blue;
    }
}

.placeholder {
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    color: #999;
}

// 桌面端官方 iso 链接固定为 3 个
@media screen and (min-width: @wu-mobile-breakpoint) {
    .iso-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
