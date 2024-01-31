<script>
// 引入库
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 引入组件
import Banner from '../components/Banner.vue'
import Card from '../components/Card.vue'
import LoadAnim from '../components/LoadAnim.vue'
import TopNav from '../components/TopNav.vue'

export default {
    name: 'DataCategoryList',
    components: { Banner, LoadAnim, Card, TopNav },
    setup() {
        // STEP1 ------ 设定初始值
        let data = reactive({
            category: [],
            isLoading: true,
            customVersionRange: null
        })

        // STEP2 ------ 获取数据
        // 通过当前路由，得到当前的 platform 并发送给 API
        let router = useRouter()
        let platform = router.currentRoute.value.params.platform
        axios.get('https://wutd.crrashh.com/api/category?platform=' + platform)

            // STEP3 ------ 处理并修改数据
            .then(function (response) {
                let resp = response.data.content
                // 获取到数据后，关闭加载动画
                data.category = resp
                data.isLoading = false
                // 处理版本范围
                if (resp.range[1] == null) {
                    data.customVersionRange = resp.range[0] + ' ~ ?'
                } else {
                    data.customVersionRange = resp.range[0] + ' ~ ' + resp.range[1]
                }

            })
            .catch(() => {
                // 由于服务器设置，目前只返回 404
                router.replace('/404')
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(data) }
    },
    methods: {
        // 获取点击的构建的 path
        getPath(build) {
            return '/detail/' + this.$route.params.platform + '/' + build
        },

        // 刷新数据
        refreshData(platform) {
            let vueObj = this
            axios.get('https://wutd.crrashh.com/api/category?platform=' + platform)
                .then(function (response) {
                    let resp = response.data.content
                    vueObj.category = resp
                    if (resp.range[1] == null) {
                        vueObj.customVersionRange = resp.range[0] + ' ~ ?'
                    } else {
                        vueObj.customVersionRange = resp.range[0] + ' ~ ' + resp.range[1]
                    }
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
    <Banner class="z-20" :description="category.name">
        <div class="title">版本列表</div>
    </Banner>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <main v-if="!isLoading">

        <!-- 快速导航 -->
        <TopNav>
            <span class="icon-left" v-if="category.previous != null">
                <router-link :to="category.previous.path" @click="refreshData(category.previous.path)">
                    {{ category.previous.name }}</router-link>
            </span>
            <span class="grow"></span>
            <span class="icon-right" v-if="category.next != null">
                <router-link :to="category.next.path" @click="refreshData(category.next.path)">
                    {{ category.next.name }}</router-link>
            </span>
        </TopNav>

        <!-- 基本信息 -->
        <Card class="overview">
            <div>
                <p class="icon-code">平台代号 / {{ category.codename }}</p>
                <p class="icon-time">开发周期 / {{ category.semester }}</p>
            </div>
            <div>
                <p class="icon-tag">版本范围 / {{ customVersionRange }}</p>
            </div>
        </Card>

        <!-- 数据表 -->
        <div class="data rounded-lg shadow">
            <div class="head">
                <span class="left">版本</span>
                <span class="right">发布时间</span>
            </div>

            <div class="content leading-8" v-for="row in category.list" :key="row[0]">
                <router-link :to="getPath(row[0])">
                    <span class="left">{{ row[0] }}</span>
                    <span class="right">{{ row[1] }}</span>
                </router-link>
            </div>
        </div>
    </main>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

// 数据表
.data {
    margin: 1.5em 0;
    .left { width: 30%; }
    .right { width: 70%; }

    .head {
        background-color: #fff;
        border-bottom: 1px solid #ccc;

        span {
            display: inline-block;
            padding: 8px 1em;
            font-size: var(--th-font-size);
        }
    }

    .content {
        background-color: @wu-color-theme-bg;
        border-bottom: .25px solid #dedede;
        a { display: block; }
        span {
            padding: 4px 1em;
            font-size: var(--td-font-size);
            display: inline-block; 
        }
    }

    .content:hover {
        background-color: #fff;
    }
}

@media screen and (max-width: 650px) {
    main {
        --th-font-size: 16px;
        --td-font-size: 16px;
    }
}

@media screen and (min-width: 650px) {
    main {
        --th-font-size: 20px;
        --td-font-size: 18px
    }
}
</style>