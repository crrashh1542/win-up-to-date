<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import Card from '@/components/widgets/Card.vue'
import Dropdown from '@/components/widgets/Dropdown.vue'
import CategoryItem from '../components/CategoryItem.vue'
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
            <!-- multi为true -> Dropdown，false直接传入 -->
            <template v-for="platform in currentCategory.platforms" :key="platform.name">
                <Dropdown v-if="platform.multi" :items="platform.items" class="platform-dropdown">
                    <CategoryItem
                        :platform="platform"
                        :item="platform.items[0]"
                        :count="platform.items.length"
                        :link="false"
                        :padded="false"
                    />

                    <template #item="{ item }">
                        <CategoryItem :platform="platform" :item="item" />
                    </template>
                </Dropdown>

                <Card v-else class="platform-card">
                    <template v-for="(item, index) in platform.items" :key="index">
                        <hr v-if="index > 0" />
                        <CategoryItem :platform="platform" :item="item" />
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

    .card.platform-card {
        padding: 0;
        margin-bottom: 0;
    }
}
</style>
