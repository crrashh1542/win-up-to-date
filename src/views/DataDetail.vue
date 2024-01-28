<script>
// 引入库
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 引入组件
import Banner from '../components/Banner.vue'
import Card from '../components/Card.vue'
import Catalog from '../components/Catalog.vue'
import CopiableCode from '../components/CopiableCode.vue'
import LoadAnim from '../components/LoadAnim.vue'
import TopNav from '../components/TopNav.vue'

export default {
    name: 'DataDetails',
    components: { Banner, LoadAnim, Card, Catalog, CopiableCode, TopNav },
    setup() {
        // STEP1 ------ 设定初始值
        let data = reactive({
            detail: {build:{}},
            isLoading: true,
            customVersionRange: null
        })

        // STEP2 ------ 获取数据
        // 通过当前路由，得到当前的 platform 和 build 并发送给 API
        let router = useRouter()
        let [platform, build] =
            [router.currentRoute.value.params.platform, router.currentRoute.value.params.build]
        axios.get('https://wutd.crrashh.com/api/detail?platform=' + platform + '&build=' + build)

            // STEP3 ------ 处理并修改数据
            .then(function (response) {
                let resp = response.data.content
                // 获取到数据后，关闭加载动画
                data.detail = resp
                data.isLoading = false
            })
            .catch(() => {
                // 由于服务器设置，目前只返回 404
                router.replace('/404')
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(data) }
    },
    methods: {
        // 组合路由路径
        constructRoute(obj) {
            return '/detail/' + obj.category + '/' + obj.build
        },

        // 刷新数据
        refreshData(platform, build) {
            let vueObj = this
            axios.get('https://wutd.crrashh.com/api/detail?platform=' + platform + '&build=' + build)
                .then(function (response) {
                    let resp = response.data.content
                    vueObj.detail = resp
                })
                .catch(() => {
                    this.$router.replace('/404')
                })
        }
    }
}
</script>

<template>
    <!-- 横幅 -->
    <Banner class="z-20" :description="detail.build.number">
        <div class="title">版本详情</div>
    </Banner>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <div class="wrapper" v-if="!isLoading">

        <!-- 快速导航 -->
        <TopNav>
            <span class="icon-left" v-if="detail.nav.previous != null">
                <router-link 
                    :to="constructRoute(detail.nav.previous)" 
                    @click="refreshData(detail.nav.previous.category, detail.nav.previous.build)">
                    {{ detail.nav.previous.build }}</router-link>
            </span>
            <span class="grow"></span>
            <span class="icon-right" v-if="detail.nav.next != null">
                <router-link 
                    :to="constructRoute(detail.nav.next)" 
                    @click="refreshData(detail.nav.next.category, detail.nav.next.build)">
                    {{ detail.nav.next.build }}</router-link>
            </span>
        </TopNav>

        <!-- 一览卡片 -->
        <Card class="overview">
            <div>
                <p class="icon-tag">构建版号 / {{ detail.build.number }}</p>
                <p class="icon-branch">构建分支 / {{ detail.build.branch }}</p>
                <p class="icon-compile">编译时间 / {{ detail.build.compileTime }}</p>
            </div>
            <div>
                <p class="icon-arch">系统架构 / <span v-for="i in detail.build.arch" :key="i">{{ i }}&nbsp;&nbsp;</span></p>
                <p class="icon-announcement">推送频道 / {{ detail.release.channel }}</p>
                <p class="icon-time">推送时间 / {{ detail.release.time }}<span class="suffix"> (UTC)</span></p>
            </div>
        </Card>
        <br /><br />

        <!-- 发版信息 -->
        <Card>
            <Catalog class="font-semibold icon-announcement">发版信息</Catalog>
            <p v-if="detail.release.url !== null">官方发版日志：
                <a target="_blank" :href="detail.release.url">{{ detail.release.announcePlace }}</a>
            </p>
            <p v-if="detail.featureIds !== null">ViveID 列表：
                <a target="_blank" :href="detail.featureIds.url">{{ detail.featureIds.fileName }}</a>
            </p>
        </Card>

        <!-- 下载 UUP -->
        <Card v-if="detail.updateId !== null">
            <Catalog class="font-semibold icon-uup">从 UUP 获取构建</Catalog>
            <p v-for="id in detail.updateId" :key="id.arch">
                {{ id.arch }}：<CopiableCode :value="id.id" />
            </p>
        </Card>

        <!-- 下载 ISO -->
        <Card v-if="detail.download !== null">
            <Catalog class="font-semibold icon-iso">下载 ISO</Catalog>
            <p>文件名：{{ detail.download.name }}</p>
            <p>下载地址：<a target="_blank" :href="detail.download.url">{{ detail.download.source }}</a></p>
            <p>MD5：<CopiableCode :value="detail.download.md5" /></p>
            <p>SHA-256：<CopiableCode :value="detail.download.sha256" /></p>
        </Card>

    </div>

</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

// 一览卡片
.card.overview {
    background-color: #fff;
    display: var(--card-block-display);
    padding: 0 1.5em;

    div {
        width: var(--card-block-flex-width);

        p {
            font-size: var(--card-tsize);
            line-height: 1;
            .suffix {
                display: var(--card-suffix-display);
            }
        }
        p::before {
            padding-right: .4em;
        }
    }
}

// 其他卡片
.card {
    padding: 0 1em;
    background-color: rgba(255, 255, 255, .8);
    margin-bottom: .2em;
    .catalog::before {
        margin-right: @wu-icon-spacing;
    }
    p {
        line-height: 1.4;
        word-wrap: break-word;
        font-size: var(--card-tsize);
        text-overflow: ellipsis;
    }
}

// 移动端适配
// 695px +
@media screen and (min-width: 695px) {
    .card {
        --card-tsize: 1.1rem;
        --card-block-display: flex;
        --card-block-flex-width: 50%;
        --card-suffix-display: inline;
    }
}
// 695px ~ 750px
@media screen and (max-width: 695px) {
    .card {
        --card-tsize: 1.1rem;
        --card-block-display: flex;
        --card-block-flex-width: 50%;
        --card-suffix-display: none;
    }
}
// 635px ~ 700px
@media screen and (max-width: 655px) {
    .card {
        --card-tsize: 1rem;
        --card-block-display: flex;
        --card-block-flex-width: 100%;
        --card-suffix-display: inline;
    }
}
// 570px ~ 635px
@media screen and (max-width: 635px) {
    .card {
        --card-suffix-display: none;
    }
}
// 365px ~ 570px
@media screen and (max-width: 570px) {
    .card {
        --card-block-display: inline-block;
        --card-suffix-display: inline;
    }
}
// 365px -
@media screen and (max-width: 365px) {
    .card {
        --card-block-display: inline-block;
        --card-suffix-display: none;
    }
}
</style>