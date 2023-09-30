<script>
// 引入库和数据和组件
import buildInfo from '../scripts/parseInfo'
import Banner from '../components/Banner.vue'
import Card from '../components/Card.vue'

export default {
    name: 'ViewAbout',
    components: { Banner, Card },
    data() {
        return { buildInfo }
    }
}
</script>

<template>
    <Banner class="z-20">
        <div class="title">关于项目</div>
    </Banner>

    <p>如你所见，这是一个反映 Windows 系统各版本情况实时进展的统计<s>和一大堆其它奇奇怪怪莫名其妙的功能混在一起的</s>的孤单的互联网站点。</p>
    <p>站长云萧自身也是一个 Windows Insider 的爱好者，如果你喜欢这个项目的话我会很开心的说！快去给项目点个小星星吧！=≡Σ((( つ•̀ω•́)つ</p>
    <p></p>
    <br />

    <Card v-for="i in buildInfo" :key="i.key" class="text-lg">
        <!-- 如果有外部链接，加 a 标签 -->
        <a v-if="i[3] !== undefined" :href="i[2]" class="flex">
            <span class="flex-none item" :class="i[1]">{{ i[0] }}</span>
            <span class="grow"></span>
            <span class="flex-none value">{{ i[3] }}</span>
        </a>

        <!-- 如果没有外部链接，加 span 标签 -->
        <span v-else class="flex">
            <span class="flex-none item" :class="i[1]">{{ i[0] }}</span>
            <span class="grow"></span>
            <span class="flex-none value">{{ i[2] }}</span>
        </span>

    </Card>
    <br />
    <p>本项目数据来源于<a href="https://github.com/crrashh1542/win-up-to-date/tree/data">公共维护的仓库</a>，以后会在咕咕咕技术比较成熟之后有可能会换到 UUP dump
        上。项目遵循 GPL-3.0 开源协议，并仅限于作展示和交流学习用途。</p>
    <p>Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目涉及的字体和图片仅用作学习，其版权归原公司所有；图标来自 <a
            href="https://www.iconfont.cn">iconfont</a>。</p>
</template>

<style lang="less" scoped>
@import url('../assets/styles/reset.less');

// 桌面端
@media screen and (min-width: 800px) {
    .card {
        padding: 10px 1.5em;

        .item::before {
            margin-right: .5em;
            font-size: 1.2em;
        }
    }
}

// 移动端
@media screen and (max-width: 800px) {
    .card {
        padding: 7px .75em;

        .item::before {
            margin-right: .25em;
        }

        .value {
            font-size: 16px;
        }
    }
}</style>