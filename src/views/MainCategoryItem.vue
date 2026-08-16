<script setup lang="ts">
import Badge from '@/components/widgets/Badge.vue'
import type { MainCategoryItem, MainCategoryPlatform } from '@/types/data'

defineOptions({ name: 'MainCategoryItem' })

defineProps<{
    platform: MainCategoryPlatform
    item: MainCategoryItem
}>()
</script>

<template>
    <component
        :is="item.category !== undefined ? 'router-link' : 'div'"
        v-bind="item.category !== undefined ? { to: `/category/${item.category}` } : {}"
        :class="[
            'container',
            item.continued ? '' : 'uncontinued',
            item.category !== undefined ? 'u-hoverable' : 'disabled',
        ]"
    >
        <div class="info">
            <div class="codename">
                {{ item.name === 'default' ? platform.name : item.name }}
            </div>
            <div class="version">{{ item.semester }} {{ item.latestBuild }}</div>
        </div>
        <div class="badges">
            <Badge v-for="t in item.tag" :key="t.name" :color="t.color">{{ t.name }}</Badge>
        </div>
    </component>
</template>

<style lang="less" scoped>
// 条目布局：沿用原平台列表的条目
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
</style>
