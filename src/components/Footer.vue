<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBuildsStore } from '@/stores/latestBuilds'

defineOptions({ name: 'MainFooter' })

const { dataVersion } = storeToRefs(useBuildsStore())
useBuildsStore().fetchDataVersion()

const hash = computed(() => dataVersion.value?.hash ?? 'unknown')
const date = computed(() => dataVersion.value?.date ?? 'unknown')
</script>

<template>
    <div class="footer">
        <p>
            (C) 2023-2026 crrashh1542.
            <a href="//beian.miit.gov.cn" target="_blank">蜀ICP备2022029657号-2</a>
        </p>
        <p v-if="dataVersion">
            数据版本: {{ date }}
            （Git: <a :href="`https://github.com/crrashh1542/win-up-to-date-data/commit/${hash}`">{{ hash }}</a>）
        </p>
    </div>
</template>

<style lang="less" scoped>
.footer {
    margin-top: @wu-layout-footer-margin;
    border-top: 1px solid @wu-color-border;
    padding: 1em 36px;
    width: 100%;
    font-size: 14px;

    p {
        margin: 0;
        line-height: 1.8;
    }
}
</style>
