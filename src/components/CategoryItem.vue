<script setup lang="ts">
import { computed } from 'vue'
import Badge from '@/components/widgets/Badge.vue'
import type { MainCategoryItem, MainCategoryPlatform } from '@/types/data'

defineOptions({ name: 'CategoryRow' })

const props = withDefaults(
    defineProps<{
        platform: MainCategoryPlatform
        item: MainCategoryItem
        /** 版本数：提供时 badges 显示「N 个版本」（gray），否则显示 item.tag */
        count?: number
        /** 是否渲染为可点击链接；默认按 item.category 推断，header 场景传 false */
        link?: boolean
        /** 是否带行内 padding；header 场景传 false，由外层 Dropdown header 提供 padding */
        padded?: boolean
    }>(),
    { count: undefined, link: undefined, padded: true }
)

// header（Dropdown 标题）非链接；普通条目按是否有 category 决定跳转
const isLink = computed(() => props.link ?? props.item.category !== undefined)

const classes = computed(() => [
    'container',
    { unpadded: !props.padded },
    props.item.continued ? '' : 'uncontinued',
    // link 显式传 false（header）时非交互；否则按是否有 category 决定 hover/禁用
    props.link === false ? '' : props.item.category !== undefined ? 'u-hoverable' : 'disabled',
])
</script>

<template>
    <component
        :is="isLink ? 'router-link' : 'div'"
        v-bind="isLink ? { to: `/category/${item.category}` } : {}"
        :class="classes"
    >
        <div class="info">
            <div class="codename">{{ item.name === 'default' ? platform.name : item.name }}</div>
            <div class="version">{{ item.semester }} {{ item.latestBuild }}</div>
        </div>
        <div class="badges">
            <Badge v-if="count !== undefined" color="gray">{{ count }} 个版本</Badge>
            <template v-else>
                <Badge v-for="t in item.tag" :key="t.name" :color="t.color">{{ t.name }}</Badge>
            </template>
        </div>
    </component>
</template>

<style lang="less" scoped>
// 条目/header 行：codename + version 竖排（左），badges（右）
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
        font-size: 14px;
        color: @wu-color-text-accent;
    }

    .badges {
        display: flex;
        gap: 4px;
        margin-right: @wu-layout-card-padding-x;
    }

    &.disabled {
        // 没有 category 数据
        cursor: not-allowed;
        opacity: 0.6;
    }
    &.uncontinued:not(.unpadded) {
        // 已停止维护
        background-color: @wu-color-base;
    }
    // header 场景
    &.unpadded {
        flex: 1;
        padding: 0;
    }
}
</style>
