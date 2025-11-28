<script>
// 引入库
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import axios from 'axios'

// 引入组件
import Card from '@/components/widgets/Card.vue'
import Code from '@/components/widgets/Code.vue'
import LoadAnim from '@/components/widgets/LoadAnim.vue'
import TopNav from '@/components/widgets/TopNav.vue'
import initDetailData from '@/utils/initDetailData'

const api = import.meta.env.VITE_API_URL

export default {
    name: 'DataDetail',
    components: { LoadAnim, Card, Code, TopNav, Icon },
    setup() {
        // STEP1 ------ 设定初始值
        let pageData = reactive({
            data: { build: {} },
            isLoading: true,
            nav: null
        })

        // STEP2 ------ 获取数据
        // 通过当前路由，得到当前的 platform 和 build 并发送给 API
        let router = useRouter()
        let [platform, build] = [
            router.currentRoute.value.params.platform,
            router.currentRoute.value.params.build,
        ]
        axios.get(api + '/detail?platform=' + platform + '&build=' + build)

            // STEP3 ------ 处理并修改数据
            .then(response => {
                initDetailData(response.data, pageData)
            })
            .catch(() => {
                // 由于服务器设置，目前只返回 404
                router.replace('/404')
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(pageData) }
    },
    methods: {
        // 获取“构建归属”处的路由
        getBelongingRoute(value) {
            return '/category/' + value
        },

        // 刷新数据
        refreshData(obj) {
            let vueObj = this
            axios.get(api + '/detail?platform=' + obj.platform + '&build=' + obj.build)
                .then(response => {
                    // 由于 pageData 的数据已经存在于 Vue 实例上了，所以直接访问 vueObj
                    initDetailData(response.data, vueObj)
                })
                .catch(() => {
                    // 由于服务器设置，目前只返回 404
                    router.replace('/404')
                })
        },
    },
}
</script>

<template>
    <!-- 横幅 -->
    <div class="u-banner">版本详情</div>
    <div class="u-subbanner">{{ data.build.number }}</div>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" mode="filled" />

    <div class="wrapper" v-if="!isLoading">
        <!-- 快速导航 -->
        <TopNav :data="nav" @event="refreshData" />

        <!-- 一览卡片 -->
        <Card class="overview">
            <div class="line-left">
                <p>
                    <Icon icon="fluent:tag-24-regular" width="22" height="22" />
                    构建版号 / {{ data.build.number }}
                </p>
                <p>
                    <Icon icon="fluent:branch-24-regular" width="22" height="22" />
                    构建分支 / {{ data.build.branch }}
                </p>
                <p>
                    <Icon icon="fluent:clock-24-regular" width="22" height="22" />
                    编译时间 / {{ data.build.compileTime }}
                </p>
            </div>
            <div>
                <p>
                    <Icon icon="fluent:developer-board-24-regular" width="22" height="22" />
                    系统架构 / 
                    <span v-for="i in data.build.arch" :key="i">{{ i }}&nbsp;&nbsp;</span>
                </p>
                <p>
                    <Icon icon="fluent:search-24-regular" width="22" height="22" />
                    推送平台 / {{ data.build.counterpart }}
                </p>
                <p>
                    <Icon icon="fluent:code-24-regular" width="22" height="22" />
                    构建归属 / 
                    <router-link :to="getBelongingRoute(data.belongsTo.path)">
                        {{ data.belongsTo.name }}
                    </router-link>
                </p>
            </div>
        </Card>

        <!-- 发版信息卡片 -->
        <Card mode="block">
            <div class="u-catalog">
                <Icon icon="fluent:megaphone-loud-24-regular" width="28" height="28" />
                发版信息
            </div>

            <div v-if="data.release !== undefined">
                <p v-if="data.release.channel !== undefined">
                    推送频道：{{ data.release.channel }}
                </p>
                <p v-if="data.release.channel !== undefined">
                    推送时间：{{ data.release.time }} (UTC)
                </p>
                <p v-if="data.release.url !== undefined">
                    官方发版日志：
                    <a target="_blank" :href="data.release.url">
                        {{ data.release.announcePlace }}</a>
                </p>
                <p v-if="data.featureIds !== undefined">
                    ViveID 列表：
                    <a target="_blank" :href="data.featureIds.url">
                        {{ data.featureIds.fileName }}</a>
                </p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可获取的发版信息</p>
            </div>
        </Card>

        <!-- 下载 UUP -->
        <Card mode="block">
            <div class="u-catalog">
                <Icon icon="fluent:desktop-arrow-down-24-regular" width="28" height="28" />
                从 UUP 获取构建
            </div>

            <div v-if="data.updateId !== undefined">
                <p v-for="id in data.updateId" :key="id.arch">
                    {{ id.arch }}：<Code :value="id.id" is-copiable=true />
                </p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可获取的 UUP 信息</p>
            </div>
        </Card>

        <!-- 下载 ISO -->
        <Card mode="block">
            <div class="u-catalog">
                <Icon icon="fluent:box-24-regular" width="28" height="28" />
                下载 ISO / 更新包
            </div>

            <div v-if="data.download !== undefined && data.download != {}">
                <p>文件名称：{{ data.download.name }}</p>
                <p>系统架构：{{ data.download.arch }}</p>
                <p>
                    下载地址：
                    <span v-for="(l, index) in data.download.link" :key="index">
                        <a target="_blank" :href="l.url">{{ l.source }}</a>
                        &nbsp;&nbsp;&nbsp;
                    </span>
                </p>
                <p>MD5：<Code :value="data.download.md5" is-break-word=true is-copiable=true /></p>
                <p>SHA-256：<Code :value="data.download.sha256" is-break-word=true is-copiable=true /></p>
            </div>
            <div class="placeholder" v-else>
                <p>暂无可供下载的内容</p>
            </div>
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
.placeholder {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
