<script lang="ts" setup>
defineOptions({ name: 'PageFooter' })
</script>

<template>
    <div class="footer">
        <p>
            (C) 2023-2026 crrashh1542.
            <a href="//beian.miit.gov.cn" target="_blank">蜀ICP备2022029657号-2</a>
        </p>
    </div>
</template>

<style lang="less" scoped>
.footer {
    flex-shrink: 0;
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
