<!--
    Dropdown 折叠/下拉组件

    - 默认 slot 为 header，点击展开/收起
    - 整体是一个卡片容器：header 与 body 连接为一体，用分隔线（hr）分隔
    - header 保持 Card mode="flex" 的横向布局；body 每一项的布局由内容（slot）决定
    - body 通过 items + #item 具名插槽逐项渲染；也可用 #body 插槽整体自定义
    - 展开/收起使用 grid-template-rows 高度动画，无需 JS 测量
-->
<script setup lang="ts" generic="T">
import { computed, useSlots } from 'vue'
import ArrowDown16RegularIcon from '@iconify-vue/fluent/arrow-down-16-regular'

import Card from './Card.vue'

defineOptions({ name: 'WidgetDropdown' })

// 展开状态，支持 v-model
const expanded = defineModel<boolean>({ default: false })

const props = withDefaults(
    defineProps<{
        /** body 数据列表，配合 #item 插槽逐项渲染 */
        items?: T[]
    }>(),
    { items: () => [] }
)

const slots = useSlots()

// 是否有 body 内容（决定 header 下方是否显示分隔线）
const hasContent = computed(() => props.items.length > 0 || Boolean(slots.body))
</script>

<template>
    <!-- 整体复用 Card 组件作为一体卡片容器，header 与 body 连接为一体 -->
    <Card class="dropdown">
        <!-- Header：默认 slot，点击展开/收起 -->
        <div
            class="dropdown-header u-hoverable"
            role="button"
            tabindex="0"
            :aria-expanded="expanded"
            @click="expanded = !expanded"
            @keydown.enter.prevent="expanded = !expanded"
            @keydown.space.prevent="expanded = !expanded"
        >
            <slot />
            <span class="indicator" :class="{ expanded }">
                <slot name="indicator">
                    <ArrowDown16RegularIcon width="16" height="16" />
                </slot>
            </span>
        </div>

        <!-- Body：展开时显示 -->
        <div class="dropdown-body" :class="{ expanded }">
            <div class="dropdown-body-inner">
                <hr v-if="hasContent" class="separator" />

                <!-- 自定义 body -->
                <template v-if="slots.body">
                    <slot name="body" />
                </template>
                <!-- 数据列表：项之间用分隔线 -->
                <template v-else>
                    <template v-for="(item, index) in items" :key="index">
                        <hr v-if="index > 0" class="separator" />
                        <div class="dropdown-item">
                            <slot name="item" :item="item" :index="index" />
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </Card>
</template>

<style lang="less" scoped>
// 复用 Card 组件作为一体卡片，覆盖其默认 padding 与 block 间距：
// - padding 置 0，使分隔线可贯穿整个卡片，行间距由各行自身 padding 控制
// - 去掉 block 模式的 margin-bottom，Dropdown 之间的间距交给外部容器（如 .category gap）
.card.dropdown {
    padding: 0;
    margin-bottom: 0;
}

// Header：横向布局，与 Card mode="flex" 保持一致
.dropdown-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: @wu-layout-card-padding-y @wu-layout-card-padding-x;
    cursor: pointer;
    user-select: none;

    .indicator {
        display: flex;
        margin-left: auto;
        transition: transform 0.2s ease;

        &.expanded {
            transform: rotate(180deg);
        }
    }
}

// 分隔线：贯穿整个卡片
.separator {
    margin: 0;
    border: 0.5px solid @wu-color-border;
}

// 展开/收起：grid-template-rows 高度动画
.dropdown-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.25s ease;

    &.expanded {
        grid-template-rows: 1fr;
    }
}

.dropdown-body-inner {
    overflow: hidden;
    min-height: 0;
}

@media screen and (prefers-reduced-motion: reduce) {
    .dropdown-body,
    .dropdown-header .indicator {
        transition: none;
    }
}
</style>
