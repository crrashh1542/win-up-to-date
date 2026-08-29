<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import Button from '@/components/widgets/Button.vue'
import Card from '@/components/widgets/Card.vue'
import { useSettingsStore } from '@/stores/settings'

import type { DownloadLink } from '@/types'

defineOptions({ name: 'DownloadEsd' })

const props = defineProps<{
    esd: { name: string; links: DownloadLink[] }[]
}>()

const { settings } = storeToRefs(useSettingsStore())

// ESD 下载启用 HTTPS
// http://*.b1.download.windowsupdate.com -> https://catalog.s.download.windowsupdate.com
// http://dl.delivery.mp.microsoft.com -> https://catalog.sf.dl.delivery.mp.microsoft.com
const HTTPS_HOST_RULES: [RegExp, string][] = [
    [
        /^http:\/\/(?:[^/?]+\.)?b1\.download\.windowsupdate\.com(?=[/?]|$)/i,
        'https://catalog.s.download.windowsupdate.com',
    ],
    [
        /^http:\/\/dl\.delivery\.mp\.microsoft\.com(?=[/?]|$)/i,
        'https://catalog.sf.dl.delivery.mp.microsoft.com',
    ],
]
function toHttps(url: string): string {
    for (const [pattern, host] of HTTPS_HOST_RULES) {
        if (pattern.test(url)) return url.replace(pattern, host)
    }
    return url
}
// 开启 HTTPS 后对展示的下载链接做域名替换
const esdList = computed(() => {
    if (!settings.value.isEsdHttps) return props.esd
    return props.esd.map((group) => ({
        ...group,
        links: group.links.map((link) => ({ ...link, url: toHttps(link.url) })),
    }))
})
</script>

<template>
    <div class="esd-grid">
        <Card v-for="item in esdList" :key="item.name" mode="flex">
            <div class="data">
                <div class="title">{{ item.name }}</div>
            </div>
            <div class="links">
                <a
                    v-for="link in item.links"
                    :key="link.name"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outlined" color="blue">{{ link.name }}</Button>
                </a>
            </div>
        </Card>
    </div>
</template>

<style lang="less" scoped>
.esd-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3px;
    margin-bottom: 6px;

    .card {
        justify-content: space-between;
    }
    button {
        margin-left: 0.33em;
    }
}
</style>
