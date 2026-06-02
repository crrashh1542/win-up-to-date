<script setup lang="ts">
defineOptions({ name: 'MainFooter' })
</script>

<template>
    <div class="footer">
        <p>
            (C) 2023-2026 crrashh1542. /
            <a href="//beian.miit.gov.cn" target="_blank">蜀ICP备2022029657号-2</a> /
            <a href="//icp.gov.moe/?keyword=20220551" target="_blank">萌ICP备20220551号</a>
        </p>
    </div>
</template>

<style lang="less" scoped>.footer {
    margin-top: @wu-layout-footer-margin;
    border-top: 1px solid @wu-color-border;
    padding: 1em 36px;
    width: 100%;
    font-size: 16px;
    p { margin: 0; }
}
</style>
