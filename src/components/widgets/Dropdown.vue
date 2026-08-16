<!--
    Dropdown 折叠/下拉组件

    默认 slot 为 header，点击展开/收起，body 每一项的布局由内容（slot）决定
    body 通过 items + #item 具名 slot 逐项渲染，也可用 #body 插槽整体自定义
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
        items?: T[]
    }>(),
    { items: () => [] }
)

const slots = useSlots()

// 是否有 body 内容
// 用于确定 header 下方是否显示分隔线
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

        <!-- Body -->
        <div class="dropdown-body" :class="{ expanded }">
            <div class="dropdown-body-inner">
                <hr v-if="hasContent" class="separator" />

                <!-- 自定义 body -->
                <template v-if="slots.body">
                    <slot name="body" />
                </template>
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
.card.dropdown {
    padding: 0;
    margin-bottom: 0;
}

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

.separator {
    margin: 0;
    border: 0.5px solid @wu-color-border;
}

// 展开/收起动画
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
