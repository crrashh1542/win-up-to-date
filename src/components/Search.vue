<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import Search24RegularIcon from '@iconify-vue/fluent/search-24-regular'

import Input from './widgets/Input.vue'
import request from '@/utils/request'
import debounce from '@/utils/debounce'
import { useToastStore } from '@/stores/toast'
import type { SearchBuildItem } from '@/types/data'

const router = useRouter()
const toast = useToastStore()

const query = ref('')
const results = ref<SearchBuildItem[]>([])
const isOpen = ref(false)
const activeIndex = ref(-1)
const searchRef = ref<HTMLElement>()
const itemRefs = ref<HTMLElement[]>([])

const dropdownStyle = ref<Record<string, string>>({})

const updatePosition = () => {
    if (!searchRef.value) return
    const rect = searchRef.value.getBoundingClientRect()
    dropdownStyle.value = {
        position: 'fixed',
        top: `${rect.bottom + 6}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
    }
}
// 监听页面窗口大小变化和滚动事件，更新下拉框位置
onMounted(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
})
onUnmounted(() => {
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
})

const doSearch = debounce(async (q: string) => {
    // 如果搜索框为空，则清空结果并关闭下拉框
    const trimmed = q.trim()
    if (!trimmed) {
        results.value = []
        isOpen.value = false
        return
    }
    try {
        const { data: resp } = await request({
            url: '/search',
            method: 'get',
            params: { build: trimmed },
        })
        results.value = Array.isArray(resp.content) ? resp.content : []
        activeIndex.value = -1
        isOpen.value = results.value.length > 0
    } catch (err: any) {
        console.log(err)
        toast.show({
            title: '搜索失败',
            body: err.response?.data?.message ?? '网络异常',
            intent: 'error',
        })
        results.value = []
        isOpen.value = false
    }
}, 300)
// 监听搜索框的输入变化，触发搜索
watch(query, (q) => doSearch(q))

const go = (platform: string, build: string) => {
    router.push(`/detail/${platform}/${build}`)
    query.value = ''
    results.value = []
    activeIndex.value = -1
    isOpen.value = false
}

// ---- 键盘事件处理 BEGIN ----
const onEnter = () => {
    if (activeIndex.value >= 0) {
        const item = results.value[activeIndex.value]
        go(item.platform, item.build)
    } else if (results.value.length === 1) {
        go(results.value[0].platform, results.value[0].build)
    } else if (results.value.length > 1) {
        isOpen.value = true
        activeIndex.value = 0
    } else if (query.value.trim()) {
        toast.show({
            title: '未找到',
            body: `没有与 "${query.value}" 匹配的 Build`,
            intent: 'warning',
        })
    }
}
const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (results.value.length === 0) return
        if (!isOpen.value) isOpen.value = true
        activeIndex.value = Math.min(
            activeIndex.value + 1,
            results.value.length - 1
        )
        scrollToActive()
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (results.value.length === 0) return
        activeIndex.value = Math.max(activeIndex.value - 1, 0)
        scrollToActive()
    } else if (e.key === 'Escape') {
        isOpen.value = false
        activeIndex.value = -1
    }
}
const scrollToActive = () => {
    nextTick(() => {
        const el = itemRefs.value[activeIndex.value]
        if (!el) return
        el.scrollIntoView({ block: 'nearest' })
    })
}
// ---- 键盘事件处理 END ----

const onFocusOut = (e: FocusEvent) => {
    const related = e.relatedTarget as HTMLElement | null
    if (!related || !related.closest('.build-search-dropdown')) {
        isOpen.value = false
    }
}
const onFocus = () => {
    if (query.value.trim() && results.value.length > 0) {
        isOpen.value = true
    }
}
</script>

<template>
    <div ref="searchRef" class="build-search">
        <Input
            v-model="query"
            placeholder="搜索 Build，如 26063.1"
            @keydown.enter.prevent="onEnter"
            @keydown="onKeyDown"
            @focusout="onFocusOut"
            @focus="onFocus"
            :style="{ width: '30em' }"
        >
            <template #contentBefore>
                <Search24RegularIcon width="18" height="18" />
            </template>
        </Input>
        <Teleport to="body">
            <div
                v-if="isOpen"
                class="build-search-dropdown"
                :style="dropdownStyle"
            >
                <div
                    v-for="(item, index) in results"
                    :key="`${item.platform}/${item.build}`"
                    :ref="
                        (el) => {
                            if (el) itemRefs[index] = el as HTMLElement
                        }
                    "
                    :class="['item', { active: index === activeIndex }]"
                    @mousedown.prevent="go(item.platform, item.build)"
                >
                    <span class="build">{{ item.build }}</span>
                    <span class="platform">{{ item.platform }}</span>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style lang="less" scoped>
.build-search {
    width: 30em;
}
</style>

<style lang="less">
// 因为 container 启用了 overflow-y: scroll，z-index 不生效下拉框被遮挡
// 所以 dropdown 需要通过 Teleport 渲染到 body，需使用非 scoped 样式
.build-search-dropdown {
    position: fixed;
    max-height: 320px;
    overflow-y: auto;
    background: #fff;
    border: 1px solid @wu-color-border;
    border-radius: 6px;
    box-shadow: 0 4px 12px #00000014;
    z-index: 9999;

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;

        &:hover,
        &.active {
            background: @wu-color-base;
        }

        .build {
            font-weight: 600;
            color: #222;
        }

        .platform {
            font-size: 12px;
            color: #888;
        }
    }
}
</style>
