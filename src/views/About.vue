<script>
// 引入库和数据和组件
import packageInfo from '/package.json'
import buildInfo from '/temp/buildInfo.json'
import moment from 'moment'

import Banner from '../components/Banner.vue'

// 处理项目以及构建数据
const buildTime = moment(buildInfo.time).format('YYYY-MM-DD HH:mm:ss') + ' CST'
const repoName = packageInfo.repository.split('https://github.com/')[1]

export default {
    name: 'ViewAbout',
    components: { Banner },
    data() {
        return { packageInfo, buildInfo, buildTime, repoName }
    }
}
</script>

<template>
    <Banner class="z-20">
        <div class="title">关于项目</div>
    </Banner>

    <p>如你所见，这是一个反映 Windows 系统各版本情况实时进展的统计<s>和一大堆其它奇奇怪怪莫名其妙的功能混在一起的</s>的孤单的互联网站点。</p>
    <p>站长云萧自身也是一个 Windows Insider 的爱好者，如果你喜欢这个项目的话我会很开心的说！快去给项目点个小星星吧！=≡Σ((( つ•̀ω•́)つ</p>
    <p>数据来源于<a href="https://github.com/crrashh1542/win-up-to-date/tree/data">公共维护的仓库</a>，以后会在咕咕咕技术比较成熟之后换到 UUP dump 上。</p>
    <br/>
    <p class="info">项目版本：v{{ packageInfo.version }}@{{ buildInfo.hash }} (build {{ buildInfo.build }})</p>
    <p class="info">构建时间：{{ buildTime }}</p>
    <p class="info">项目地址：<u><a :href="packageInfo.repository" target="_blank">{{ repoName }}</a></u></p>
    <p class="info">框架版本：Vue v{{ packageInfo.dependencies['vue'].split('^')[1] }}</p>
    <p class="info">组件版本：FluentUI Web Components v{{ packageInfo.dependencies['@fluentui/web-components'].split('^')[1] }}</p>
    <br/>
    <p>本项目遵循 GPL-3.0 开源协议，并仅作展示和交流学习用途。</p>
    <p>Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目涉及的字体和图片仅用作学习，其版权归原公司所有；图标来自 <a
            href="https://www.iconfont.cn">iconfont</a>。</p>
</template>

<style lang="less" scoped>
.info {
    margin: 0 0 0 5em;
    text-indent: -5em;
    
    a::after {
        display: none;
    }
}
</style>