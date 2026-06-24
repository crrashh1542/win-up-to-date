<script setup lang="ts">
import { computed } from 'vue'
import ArrowLeft20FilledIcon from '@iconify-vue/fluent/arrow-left-20-filled'
import ArrowRight20FilledIcon from '@iconify-vue/fluent/arrow-right-20-filled'

interface NavItem {
    route: string
    build: string
    platform: string
}

interface NavData {
    type: 'detail' | 'categoryList'
    prev?: NavItem
    next?: NavItem
}

const props = defineProps<{ data: NavData | null }>()
const isDetail = computed(() => props.data?.type === 'detail')
const buildLink = (source?: NavItem) => {
    if (!source) return null
    return {
        route: source.route,
        text: isDetail.value ? source.build : source.platform
    }
}

const prev = computed(() => buildLink(props.data?.prev))
const next = computed(() => buildLink(props.data?.next))
</script>

<template>
    
    <div class="nav">
        <RouterLink class="icon-left" v-if="prev" :to="prev.route">
            <ArrowLeft20FilledIcon width="1em" height="1em" />
            {{ prev.text }}
        </RouterLink>

        <span class="grow"></span>

        <RouterLink class="icon-right" v-if="next" :to="next.route">
            {{ next.text }}
            <ArrowRight20FilledIcon width="1em" height="1em" />
        </RouterLink>
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.nav {
    display: flex;
    color: #666;
    font-weight: 600;
    font-size: 17px;
    margin: 24px 0 12px;
    width: 100%;

    .icon-left, .icon-right {
        display: flex;
        align-items: center;
    }
    .icon-left svg {
        margin-right: .25em;
        display: flex;
    }
    .icon-right svg {
        margin-left: .25em;
        display: flex;
    }

    .grow {
        flex-grow: 1;
    }
}
</style>
