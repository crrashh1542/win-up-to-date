<script>
// 引入库
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import axios from 'axios'

// 引入组件
import Card from '@/components/widgets/Card.vue'
import LoadAnim from '@/components/widgets/LoadAnim.vue'
import TopNav from '@/components/widgets/TopNav.vue'
import initDetailData from '@/utils/initDetailData'

export default {
    name: 'DataCategoryList',
    components: { LoadAnim, Card, TopNav, Icon },
    setup() {
        // STEP1 ------ 设定初始值
        let pageData = reactive({
            data: {},
            isLoading: true,
            customVersionRange: null,
            nav: null
        })

        // STEP2 ------ 获取数据
        // 通过当前路由，得到当前的 platform 并发送给 API
        let router = useRouter()
        let platform = router.currentRoute.value.params.platform
        axios.get(
                'https://p0-wutd.api.crrashh.com/v1/category?platform=' + platform)

            // STEP3 ------ 处理并修改数据
            .then(response => {
                initDetailData(response.data, pageData)
                // 处理版本范围
                let respContent = response.data.content
                if (respContent.range[1] == null) {
                    // 如果没有提供最后一个版本，则为 “开始版本 ~ ?”
                    pageData.customVersionRange = respContent.range[0] + ' ~ ?'
                } else {
                    // 如果提红利最后一个版本，则为 “开始版本 ~ 结束版本”
                    pageData.customVersionRange =
                        respContent.range[0] + ' ~ ' + respContent.range[1]
                }
            })
            .catch(() => {
                router.replace('/404')
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(pageData) }
    },
    methods: {
        // 获取点击的构建的 path
        getPath(build) {
            return '/detail/' + this.$route.params.platform + '/' + build
        },

        // 刷新数据
        refreshData(obj) {
            let vueObj = this
            axios.get(
                    'https://p0-wutd.api.crrashh.com/v1/category?platform=' + obj.platform)
                .then(response => {
                    // 由于 pageData 的数据已经存在于 Vue 实例上了，所以直接访问 vueObj
                    initDetailData(response.data, vueObj)
                    // 处理版本范围
                    let respContent = response.data.content
                    if (respContent.range[1] == null) {
                        vueObj.customVersionRange = respContent.range[0] + ' ~ ?'
                    } else {
                        vueObj.customVersionRange =
                            respContent.range[0] + ' ~ ' + respContent.range[1]
                    }
                })
                .catch(() => {
                    this.$router.replace('/404')
                })
        },
    },
}
</script>

<template>
    <!-- 横幅 -->
    <div class="u-banner">版本列表</div>
    <div class="u-subbanner">{{ data.name }}</div>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" mode="filled" />

    <div class="wrapper" v-if="!isLoading">
        <!-- 快速导航 -->
        <TopNav :data="nav" @event="refreshData" />

        <!-- 基本信息 -->
        <Card class="overview" mode="block">
            <div class="line-left">
                <p>
                    <Icon icon="fluent:laptop-settings-24-regular" width="22" height="22" />
                    平台代号 / {{ data.codename }}
                </p>
                <p>
                    <Icon icon="fluent:code-24-regular" width="22" height="22" />
                    开发周期 / {{ data.semester }}
                </p>
            </div>
            <div>
                <p>
                    <Icon icon="fluent:tag-24-regular" width="22" height="22" />
                    版本范围 / {{ customVersionRange }}
                </p>
                <p>
                    <Icon icon="fluent:square-multiple-24-regular" width="22" height="22" />
                    分类归属 / {{ data.belonging }}
                </p>
            </div>
        </Card>

        <!-- 数据表 -->
        <Card mode="block" class="data">
            <div class="row">
                <span class="left">版本</span>
                <span class="right">发布日期</span>
            </div>
            <router-link class="row" v-for="r in data.list" :key="r[0]" :to="getPath(r[0])">
                    <span class="left">{{ r[0] }}</span>
                    <span class="right">{{ r[1] }}</span>
            </router-link>
        </Card>

    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');
.overview {
    display: var(--v-detail-overview);
    .line-left {
        width: var(--v-detail-overview-width);
    }
    p {
        display: flex;
        align-items: center;
        gap: 6px;
    }
}
.data {
    padding: 0;
    font-size: 1rem;

    .row {
        padding: 12px calc(18px + 1.2%);
        display: flex;
        border-bottom: 1px solid @wu-color-border;
        transition: background-color 0.2s ease;
        .left { flex: 0 0 40%; }
        .right { flex: 0 0 60%; }
    }
    a.row:hover {
        background-color: @wu-color-base;
    }
}

// 响应式 ---- 移动端
@media screen and (max-width: 700px) {
   .wrapper { // v代表view
      --v-detail-overview: block;
      --v-detail-overview-width: 100%;
   }
}

// 响应式 ---- PC
@media screen and (min-width: 700px) {
   .wrapper {
      --v-detail-overview: flex;
      --v-detail-overview-width: 50%;
   }
}
</style>
