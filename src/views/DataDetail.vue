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
        axios.get('https://wutd.api.crrashh.com/v1/detail?platform=' + platform + '&build=' + build)

            // STEP3 ------ 处理并修改数据
            .then(function (response) {
                let resp = response.data.content
                data.detail = resp
                document.title = resp.build.number + ' / Windows Up-to-Date'
                // 获取到数据后，关闭加载动画
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
        // 组合导航路由路径
        constructNavRoute(obj) {
            return '/detail/' + obj.category + '/' + obj.build
        },

        // 组合归属路由路径
        constructBelongingRoute(value) {
            return '/category/' + value
        },

        // 刷新数据
        refreshData(platform, build) {
            document.title = build + ' / Windows Up-to-Date'
            let vueObj = this
            axios.get('https://wutd.api.crrashh.com/v1/detail?platform=' + platform + '&build=' + build)
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
            <router-link 
                :to="constructNavRoute(detail.nav.previous)" v-if="detail.nav.previous != null"
                @click="refreshData(detail.nav.previous.category, detail.nav.previous.build)">
                <span class="w-icon-left">
                    {{ detail.nav.previous.build }}
                </span>
            </router-link>
            <span class="grow"></span>
            <router-link 
                :to="constructNavRoute(detail.nav.next)" v-if="detail.nav.next != null"
                @click="refreshData(detail.nav.next.category, detail.nav.next.build)">
                <span class="w-icon-right">
                    {{ detail.nav.next.build }}
                </span>
            </router-link>
        </TopNav>

        <!-- 一览卡片 -->
        <Card class="overview">
            <div class="leading-7">
                <p class="flex">
                    <span class="w-icon-tag">构建版号&nbsp;/&nbsp;</span>
                    <span>{{ detail.build.number }}</span>
                </p>
                <p class="flex">
                    <span class="w-icon-branch shrink-0">构建分支&nbsp;/&nbsp;</span>
                    <span>{{ detail.build.branch }}</span>
                </p>
                <p class="flex">
                    <span class="w-icon-compile">编译时间&nbsp;/&nbsp;</span>
                    <span>{{ detail.build.compileTime }}</span>
                </p>
            </div>
            <div>
                <p class="flex">
                    <span class="w-icon-arch">系统架构&nbsp;/&nbsp;</span>
                    <span v-for="i in detail.build.arch" :key="i">{{ i }}&nbsp;&nbsp;</span>
                </p>
                <p class="flex">
                    <span class="w-icon-version">推送平台&nbsp;/&nbsp;</span>
                    <span>{{ detail.build.counterpart }}</span>
                </p>
                <p class="flex">
                    <span class="w-icon-code">构建归属&nbsp;/&nbsp;</span>
                    <router-link :to="constructBelongingRoute(detail.belongsTo.path)">
                    {{ detail.belongsTo.name }}</router-link>
                </p>
            </div>
        </Card>
        <br /><br />

        <!-- 发版信息 -->
        <Card>
            <Catalog class="font-semibold w-icon-announcement">发版信息</Catalog>

            <div v-if="detail.release !== undefined">
                <p v-if="detail.release.channel !== undefined">推送频道：{{ detail.release.channel }}</p>
                <p v-if="detail.release.channel !== undefined">推送时间：{{ detail.release.time }} (UTC)</p>
                <p v-if="detail.release.url !== undefined">官方发版日志：
                    <a target="_blank" :href="detail.release.url">{{ detail.release.announcePlace }}</a>
                </p>
                <p v-if="detail.featureIds !== undefined">ViveID 列表：
                    <a target="_blank" :href="detail.featureIds.url">{{ detail.featureIds.fileName }}</a>
                </p>
            </div>

            <div class="placeholder w-full h-24 text-center" v-else>
                <p>暂无可获取的发版信息</p>
            </div>
        </Card>

        <!-- 下载 UUP -->
        <Card>
            <Catalog class="font-semibold w-icon-uup">从 UUP 获取构建</Catalog>

            <div v-if="detail.updateId !== undefined">
                <p v-for="id in detail.updateId" :key="id.arch">
                    {{ id.arch }}：<CopiableCode :value="id.id" />
                </p>
            </div>

            <div class="placeholder w-full h-24 text-center" v-else>
                <p>暂无可获取的 UUP 信息</p>
            </div>
        </Card>

        <!-- 下载 ISO -->
        <Card>
            <Catalog class="font-semibold w-icon-iso">下载 ISO / 更新包</Catalog>

            <div v-if="detail.download !== undefined">
                <p>文件名称：{{ detail.download.name }}</p>
                <p>系统架构：{{ detail.download.arch }}</p>
                <p>下载地址：<span v-for="(l, index) in detail.download.link" :key="index">
                    <a target="_blank" :href="l.url">{{ l.source }}</a>&nbsp;&nbsp;&nbsp;
                </span></p>
                <p>MD5：<CopiableCode :value="detail.download.md5" /></p>
                <p>SHA-256：<CopiableCode :value="detail.download.sha256" /></p>
            </div>

            <div class="placeholder w-full h-24 text-center" v-else>
                <p>暂无可供下载的内容</p>
            </div>
        </Card>


    </div>

</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

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
        font-size: var(--card-tsize); // 取自 ../components/Card.vue
        text-overflow: ellipsis;
    }
    .placeholder > p {
        line-height: 64px; // 等效于 h-24 再减去 32px，用于垂直居中偏上
    }
}
</style>
