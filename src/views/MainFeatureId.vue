<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Tag20RegularIcon from '@iconify-vue/fluent/tag-20-regular'
import Laptop20RegularIcon from '@iconify-vue/fluent/laptop-20-regular'

import Card from '@/components/widgets/Card.vue'
import Tablist from '@/components/widgets/Tablist.vue'
import Tab from '@/components/widgets/Tab.vue'

import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { FeatureIdCategory, FeatureIdContent } from '@/types/data'

const route = useRoute()
const router = useRouter()

const menuData = reactive({
    data: [] as FeatureIdCategory[],
    isLoading: true,
})

const pageData = reactive({
    data: {} as FeatureIdContent,
    isLoading: true,
})

const selectedCategory = ref<string>()
const currentCategoryName = computed(() => {
    return menuData.data.find((cat) => cat.id === selectedCategory.value)?.name
})

// request menu
const fetchMenu = async () => {
    menuData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: '/id',
            method: 'get',
        })
        menuData.data = resp.content
        const routeId = route.params.id as string
        if (
            routeId &&
            resp.content.some((cat: FeatureIdCategory) => cat.id === routeId)
        ) {
            selectedCategory.value = routeId
        } else if (resp.content.length > 0) {
            selectedCategory.value = resp.content[0].id
        }
    } catch (error) {
        console.error(error)
    } finally {
        menuData.isLoading = false
        NProgress.done()
    }
}

// request data
const fetchData = async (category: string) => {
    pageData.isLoading = true
    NProgress.start()
    try {
        const { data: resp } = await request({
            url: `/id/${category}`,
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

// Tab 切换时同步更新 URL
const handleTabChange = (value: string) => {
    router.push(`/feature-id/${value}`)
}
fetchMenu()

// 监听 selectedCategory 的变化，更新页面数据
watch(selectedCategory, (category) => {
    if (category) fetchData(category)
})
watch(
    () => route.params.id,
    (id) => {
        if (id && id !== selectedCategory.value) {
            selectedCategory.value = id as string
        }
    }
)
</script>

<template>
    <div class="u-banner">功能 ID</div>
    <div class="u-subbanner">{{ currentCategoryName }}</div>

    <div class="feature-id" v-if="!menuData.isLoading">
        <Tablist
            v-model="selectedCategory"
            @update:modelValue="(value) => handleTabChange(value as string)"
        >
            <Tab v-for="cat in menuData.data" :value="cat.id" :key="cat.id">
                {{ cat.name }}
            </Tab>
        </Tablist>

        <Card :shadow="true" v-if="!pageData.isLoading" class="range">
            <p>
                <Laptop20RegularIcon width="20" height="20" />
                Build 类别：{{ pageData.data.belonging }}
            </p>
            <p>
                <Tag20RegularIcon width="20" height="20" />
                版本范围：
                {{ pageData.data.range[0] || '?' }} ~
                {{ pageData.data.range[1] || '?' }}
            </p>
        </Card>

        <Card :shadow="true" v-if="!pageData.isLoading">
            <component v-for="(item, index) in pageData.data.list" :key="index">
                <hr v-if="index > 0" />
                <div class="list-item u-hoverable">
                    <div class="id">
                        <div v-for="id in item.id" :key="id">{{ id }}</div>
                    </div>
                    <div class="info">
                        <div class="title">{{ item.title }}</div>
                        <div class="description">{{ item.description }}</div>
                    </div>
                    <div
                        class="variant"
                        v-if="item.variant && item.variant.length > 0"
                    >
                        variant: {{ item.variant.join(', ') }}
                    </div>
                </div>
            </component>
        </Card>
    </div>
</template>

<style lang="less" scoped>
.card {
    margin-top: 16px;
    padding: 0;
}

.range {
    padding: 12px 18px;
    p {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0;
        font-size: 15px;
        line-height: 1.8;
    }
}

.list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 1.6;
    padding: 12px 18px;

    .id {
        font-size: 14px;
        color: @wu-color-text-accent;
        text-align: center;
    }

    .info {
        flex: 1;

        .description {
            margin-top: 0.2em;
            font-size: 14px;
            line-height: 1.3;
        }
    }

    .variant {
        font-size: 14px;
        color: @wu-color-text-accent;
    }
}
</style>
