<script setup lang="ts">
import Button from '@/components/widgets/Button.vue'
import Card from '@/components/widgets/Card.vue'

import type { DownloadLink } from '@/types'

defineOptions({ name: 'DownloadEsd' })

const props = defineProps<{
    esd: { name: string; links: DownloadLink[] }[]
}>()
</script>

<template>
    <div class="esd-grid">
        <Card v-for="item in props.esd" :key="item.name" mode="flex">
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
