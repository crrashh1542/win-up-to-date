<script>
// 引入库
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 引入组件
import Banner from '../components/Banner.vue'
import Card from '../components/Card.vue'
import LoadAnim from '../components/LoadAnim.vue'

export default {
    name: 'DataCategoryList',
    components: { Banner, LoadAnim, Card },
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
    <Banner class="z-20" :description="category.codename">
        <div class="title">版本列表</div>
    </Banner>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <main v-if="!isLoading">

        <!-- 快速导航 -->
        <div class="nav flex font-bold">
            <span class="icon-left float-left item" v-if="category.previous != null">
                <router-link :to="category.previous" @click="refreshData(category.previous)">
                    {{ category.previous }}</router-link>
            </span>
            <span class="grow"></span>
            <span class="icon-right float-right item" v-if="category.next != null">
                <router-link :to="category.next" @click="refreshData(category.next)">
                    {{ category.next }}</router-link>
            </span>
        </div>

        <!-- 基本信息 -->
        <Card class="info">
            <div class="icon-code item">平台代号 / {{ category.codename }}</div>
            <div class="icon-time item">开发周期 / {{ category.semester }}</div>
            <div class="icon-tag item">版本范围 / {{ customVersionRange }}</div>
        </Card>

        <!-- 数据表 -->
        <table class="data">
            <thead>
                <tr>
                    <th width="35%">版本</th>
                    <th width="65%">发布时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in category.list" :key="row[0]">
                    <td>{{ row[0] }}</td>
                    <td>{{ row[1] }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style lang="less" scoped>
@import url('../assets/styles/reset.less');

// 本页全局
.item::before {
    // 图标间隙
    margin-right: .4em;
}

// 快速导航
.nav {
    margin: 0 .4em 12px;
    color: #666;
    font-size: var(--td-font-size);
}

// 信息栏
.info {
    font-size: var(--info-font-size);
    padding: 6px 15px;

    .item {
        display: block;
        line-height: 1.75;
        width: var(--info-item-width);
    }
}

// 数据表
table.data {
    width: 100%;
    margin: 1.5em 0;

    thead {
        background-color: #fff;
        text-align-last: left;
        border-bottom: 1px solid #ccc;

        th {
            padding: 8px 1em;
            font-size: var(--th-font-size);
        }
    }

    tbody {
        background-color: @wu-color-theme-bg;
        text-align-last: left;

        tr:hover {
            background-color: #fff;
        }

        td {
            padding: 4px 1em;
            font-size: var(--td-font-size);
        }
    }
}

@media screen and (max-width: 650px) {
    main {
        --info-font-size: 16px;
        --info-item-width: 80%;
        --th-font-size: 16px;
        --td-font-size: 16px;
    }
}

@media screen and (min-width: 650px) {
    main {
        --info-font-size: 18px;
        --info-item-width: 33%;
        --th-font-size: 20px;
        --td-font-size: 18px
    }
}
</style>