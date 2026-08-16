<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import Card from '@/components/widgets/Card.vue'
import Dropdown from '@/components/widgets/Dropdown.vue'
import MainCategoryItem from './MainCategoryItem.vue'
import Tablist from '@/components/widgets/Tablist.vue'
import Tab from '@/components/widgets/Tab.vue'

import icons from '@/assets/icons'
import { useCategoryStore } from '@/stores/apiCategory'

const { list, isLoading, selectedCategory } = storeToRefs(useCategoryStore())
useCategoryStore().fetchCategories()

// 当前选中的分类数据
const currentCategory = computed(() => {
    return list.value.find((cat) => cat.id === selectedCategory.value)
})

// 多版本平台的展开状态：数据就绪后默认全部展开，保留原"平台列表"整体可见的体验
const expandedMap = reactive<Record<string, boolean>>({})
watchEffect(() => {
    for (const platform of currentCategory.value?.platforms ?? []) {
        if (platform.multi && expandedMap[platform.name] === undefined) {
            expandedMap[platform.name] = true
        }
    }
})
</script>

<template>
    <div class="u-banner">平台</div>

    <div class="category" v-if="!isLoading">
        <!-- Tab 切换 -->
        <Tablist v-model="selectedCategory">
            <Tab v-for="cat in list" :value="cat.id" :key="cat.id">
                <template #icon>
                    <img :src="icons[cat.icon]" class="icon" />
                </template>
                {{ cat.category }}
            </Tab>
        </Tablist>

        <template v-if="currentCategory">
            <!-- 按原始平台顺序渲染：多版本用 Dropdown 折叠，单版本直接平铺条目 -->
            <template v-for="platform in currentCategory.platforms" :key="platform.name">
                <Dropdown
                    v-if="platform.multi"
                    v-model="expandedMap[platform.name]"
                    :items="platform.items"
                    class="platform-dropdown"
                >
                    <!-- Header：平台名（左）+ 版本数（右） -->
                    <span class="platform-name">{{ platform.name }}</span>
                    <span class="item-count" v-if="platform.items.length > 1">
                        {{ platform.items.length }} 个版本
                    </span>

                    <!-- Body 每一项 -->
                    <template #item="{ item }">
                        <MainCategoryItem :platform="platform" :item="item" />
                    </template>
                </Dropdown>

                <Card v-else class="platform-card">
                    <template v-for="(item, index) in platform.items" :key="index">
                        <hr v-if="index > 0" />
                        <MainCategoryItem :platform="platform" :item="item" />
                    </template>
                </Card>
            </template>
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

    // 单版本平台卡片：直接平铺条目，覆盖 Card 默认 padding/间距，让条目自身控制行高
    .card.platform-card {
        padding: 0;
        margin-bottom: 0;
    }

    // 多版本平台 Dropdown
    .platform-dropdown {
        // Header：平台名（左）+ 版本数（右，由 indicator 的 margin-left:auto 推到最右）
        .platform-name {
            font-size: 18px;
            font-weight: 500;
        }

        .item-count {
            margin-right: 0.5em;
            font-size: 13px;
            color: @wu-color-text-accent;
        }
    }
}
</style>
