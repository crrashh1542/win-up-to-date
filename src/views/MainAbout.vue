<script>
import buildInfo from '../scripts/parseInfo'
import Banner from '../components/Banner.vue'
import Card from '../components/Card.vue'

const sources = [
    ['https://msbuilds.rg-adguard.net', 'MSFT BUFFET DATABASE'],
    ['https://changewindows.org', 'ChangeWindows'],
    ['https://bbs.pcbeta.com/viewthread-1941423-1-1.html', '远景论坛 - 2262x(2263x).2715/2700更新包和修复包下载 & 内部版本进度 & .NET CU'],
    ['https://community.wvbtech.com', 'wvbCommunity']
]

export default {
    name: 'MainAbout',
    components: { Banner, Card },
    data() {
        return {
            buildInfo, sources
        }
    }
}
</script>

<template>
    <Banner class="z-20">
        <div class="title">关于项目</div>
    </Banner>

    <p>如你所见，这是一个反映 Windows 系统各版本情况实时进展的统计<s>和一大堆其它莫名其妙的功能混一起的</s>的孤单的站点。</p>
    <p>作者云萧自身也是一个 Windows Insider 爱好者，若你喜欢这个项目，我会很开心的说！给项目点个小星星吧！=≡Σ((( つ•̀ω•́)つ</p>
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
    <p>本项目数据托管于<a href="https://github.com/crrashh1542/win-up-to-date/tree/data">公共维护的仓库</a>，<s>以后会在咕咕咕技术比较成熟之后有可能会换到 UUP
            dump 上</s>。项目遵循 GPL-3.0 开源协议，并仅限于作展示和交流学习用途。</p>
    <p>以下为该仓库数据的数据来源，由衷感谢：</p>

    <p>
    <ul>
        <li v-for="s in sources" :key="s.value">
            <a target="_blank" class="link" :href="s[0]">{{ s[1] }}</a>
        </li>
    </ul>
    </p>

    <p>Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目涉及的字体和图片仅用作学习，其版权归原公司所有；图标来自 <a
            href="https://www.iconfont.cn">iconfont</a>。</p>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
.card {
    padding: var(--about-card-padding);
}

li {
    list-style: circle;
    margin-left: 1em;
}

// 桌面端
@media screen and (min-width: 800px) {
    .card {
        --about-card-padding: 10px 1.5em;

        .item::before {
            margin-right: .5em;
            font-size: 1.2em;
        }
    }
}

// 移动端
@media screen and (max-width: 800px) {
    .card {
        --about-card-padding: 9px .8em;

        .item::before {
            margin-right: .25em;
        }

        .value {
            font-size: 16px;
        }
    }
}
</style>