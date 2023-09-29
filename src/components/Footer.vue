<script>
import packageInfo from '/package.json'
const version = packageInfo.version

export default {
    name: 'MainFooter',
    data() {
        return { version }
    }
}
</script>

<template>
    <div class="footer">
        <p>Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目涉及的字体和图片仅用作学习，所用图标来自 <a href="https://www.iconfont.cn">iconfont</a>，版权归原公司所有。</p>
        <p>本项目遵循 GPL-3.0 开源协议，仅作展示和交流学习用途。<s>实时查询接口均来自 <a href="https://github.com/uup-dump">UUP dump</a>。</s></p>
        <p>(C) Copyright 2023 Kotsuki Crrashh.</p>
        <p>项目版本：v{{ version }} / <a href="//beian.miit.gov.cn">蜀ICP备2022029657号-2</a></p>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

.footer {
    background-color: @wu-color-theme-lighter;
    border-top: 1px solid @wu-color-split-line;
    padding: 1.5em var(--container-padding);
    font-size: 16px;
    color: @wu-color-text-accent;

    p {
        line-height: var(--footer-line-height);
        margin: var(--footer-margin);
    }
}

/* 不同设备适配 */
@media screen and (max-width: 800px) {
    .footer {
        --footer-line-height: 1.6;
        --footer-margin: .9em 0;
    }
}

@media screen and (min-width: 800px) {
    .footer {
        --footer-line-height: 1.4;
        --footer-margin: .5em 0;
    }
}
</style>
