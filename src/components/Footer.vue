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
        <p>Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目涉及的字体和图片仅用作学习，版权归原公司所有。</p>
        <p>本项目遵循 GPL-3.0 开源协议，仅作为展示和交流学习之用途。 <s>实时查询接口均来自 <a href="https://github.com/uup-dump">UUP dump</a>。</s></p>
        <p>当前项目版本：v{{ version }} / (C) Copyright 2023 Kotsuki Crrashh. All Rights Reserved.</p>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.footer {
    background-color: @wu-color-theme-lighter;
    border-top: 1px solid @wu-color-split-line;
    padding: var(--footer-padding);
    font-size: 16px;
    color: @wu-color-catalog;

    p {
        line-height: 1.7;
    }
}

/* 不同设备适配 -------- BEGIN */
@media screen and (max-width: 800px) { /* <=800px */
   .footer { --footer-padding: 20px 20px; }
}
@media screen and (min-width: 800px) { /* <=1024px && >800px */
   .footer { --footer-padding: 20px 20px; }
}

@media screen and (min-width: 1024px) { /* >1024px && <=1366px */
   .footer { --footer-padding: 20px 10%; }
}

@media screen and (min-width: 1366px) { /* >1366px */
   .footer { --footer-padding: 20px 15%; }
}
/* 不同设备适配 -------- END */
</style>