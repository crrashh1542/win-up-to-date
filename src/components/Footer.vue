<script>
export default {
    name: 'MainFooter'
}
</script>

<template>
    <div class="footer">
        <p>
            (C) Copyright 2023-2024 Kotsuki Crrashh. / 
            <a href="//beian.miit.gov.cn" target="_blank">蜀ICP备2022029657号-2</a> /
            <a href="//icp.gov.moe/?keyword=20220551" target="_blank">萌ICP备20220551号</a>
        </p>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

.footer {
    background-color: var(--footer-bg);
    border-top: 1px solid @wu-color-split-line;
    padding: .5em var(--container-padding);
    color: @wu-color-text-accent;
    margin-bottom: var(--footer-bottom-spacing);

    p {
        line-height: var(--footer-line-height) !important;
        margin: var(--footer-margin);
        font-size: 16px;
    }
}

/* 不同设备适配 */
@media screen and (max-width: 650px) {
    .footer {
        --footer-bg: @wu-color-theme-lighter;
        --footer-line-height: 1.6;
        --footer-margin: .9em 0;
        --footer-bottom-spacing: 73px;
    }
}

@media screen and (min-width: 650px) {
    .footer {
        --footer-bg: @wu-color-theme-bg;
        --footer-line-height: 1.6;
        --footer-margin: .9em 0;
        --footer-bottom-spacing: 0;
    }
}

@media screen and (min-width: 800px) {
    .footer {
        --footer-line-height: 1.4;
        --footer-margin: .5em 0;
    }
}
</style>
