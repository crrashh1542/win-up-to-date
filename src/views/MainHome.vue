<script>
// 引入库
import { reactive, toRefs } from 'vue'
import axios from 'axios'

// 引入组件
import Banner from '../components/Banner.vue'
import Catalog from '../components/Catalog.vue'
import Card from '../components/Card.vue'
import LoadAnim from '../components/LoadAnim.vue'

export default {
    name: 'MainHome',
    components: { Banner, Catalog, Card, LoadAnim },
    setup() {
        // STEP1 ------ 设定初始值
        let data = reactive({
            list: [],
            isLoading: true
        })

        // STEP2 ------ 获取数据
        // 此处填写 Windows 最新数据的 API 地址，相关 API 方面，咕咕正在 TODO 状态中
        // 目前仅仅对 github.com/crrashh1542/win-up-to-date@data/versions.json 做了反代而已
        axios.get('https://wutd.crrashh.com/api/latestVersions')

            // STEP3 ------ 处理并修改数据
            .then(function (response) {
                data.list = response.data.content
                data.isLoading = false
            })
            .catch(function (error) {
                console.log(error)
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(data) }
    },
    methods: {
        constructRoute(category, build) {
            return '/detail/' + category + '/' + build
        }
    },
    props: {
        // 接收 SettingDialog 传到父组件的数据
        isShowFlight: Boolean,
        isShowBranch: Boolean
    }
}
</script>

<template>
    <!-- 横幅 -->
    <Banner class="z-20" description="一个反映 Windows 系统各版本情况实时进展的统计站点">
        <div class="title">Windows Up-to-Date</div>
    </Banner>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <!-- 内容块 -->
    <div v-if="!isLoading">
        <div class="block" v-for="d in list" :key="d.category" :id="d.category">
            <!-- 标题 -->
            <Catalog>
                <span :class=d.style></span>{{ d.category }}
            </Catalog>

            <!-- 卡片 -->
            <Card v-for="r in d.releases" :key="r.name" :class=r.style>

                <!-- 如果 r.detail 存在则设置 router-link -->
                <router-link v-if="r.detail !== undefined" :to="constructRoute(r.detail.category, r.version)">
                    <div class="info">
                        <!-- 第一行 -->
                        <div class="row">
                            <span class="font-medium text-base leading-none category">
                                {{ r.name }}<!-- 类型 -->
                            </span>
                            <span class="detail codename float-right" v-if="isShowFlight !== false">
                                {{ r.codename }} {{ r.period }} <!-- 周期和代号 -->
                            </span>
                        </div>
                        <!-- 第二行 -->
                        <div class="font-medium text-2xl version">{{ r.version }}<!-- 版本 --></div>
                        <!-- 第三行 -->
                        <div class="row" v-if="r.branch !== undefined && isShowBranch !== false">
                            <span class="detail branch">{{ r.branch }}<!-- 分支 --></span>
                        </div>
                        <div class="row" v-else-if="isShowBranch !== false">
                            <span class="detail"></span>
                        </div>
                    </div>
                </router-link>

                <div v-else>
                    <div class="info">
                        <!-- 第一行 -->
                        <div class="row">
                            <span class="font-medium text-base leading-none category">
                                {{ r.name }}<!-- 类型 -->
                            </span>
                            <span class="detail codename float-right" v-if="isShowFlight !== false">
                                {{ r.codename }} {{ r.period }} <!-- 周期和代号 -->
                            </span>
                        </div>
                        <!-- 第二行 -->
                        <div class="font-medium text-2xl version">{{ r.version }}<!-- 版本 --></div>
                        <!-- 第三行 -->
                        <div class="row" v-if="r.branch !== undefined && isShowBranch !== false">
                            <span class="detail branch">{{ r.branch }}<!-- 分支 --></span>
                        </div>
                        <div class="row" v-else-if="isShowBranch !== false">
                            <span class="detail"></span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.block {
    margin: 15px 0;

    span {
        margin-right: .75em;
    }

    .card {
        margin-right: 5px;
        padding: 10px 5px 10px 20px;

        .category {
            font-size: 18px;
        }

        .version {
            padding: 4px 0 10px;
        }

        .detail {
            font-size: 16px;
            line-height: 1.5;
            word-break: break-word;
            color: @wu-color-text-accent;
        }

        .detail::before {
            font-size: 14px;
            padding-right: 7px;
        }

        .detail.branch::before {
            content: '\e993';
        }

        .detail.codename::before {
            content: '\e9d7';
        }
    }
}

/* 卡片对于不同设备端适配 */

// SEC 1 ------ 两列
@media screen and (min-width: 1150px) {
    .card {
        --card-width: 32%;
    }
}

@media screen and (max-width: 1150px) {
    .card {
        --card-width: 48%;
    }
}

// SEC 2 ------ 一列
@media screen and (max-width: 620px) {
    .card {
        --card-width: 100%;
    }
}
</style>