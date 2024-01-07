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
    name: 'DataDetails',
    components: { Banner, LoadAnim, Card },
    setup() {
        // STEP1 ------ 设定初始值
        let data = reactive({
            detail: [],
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
    <Banner class="z-20" :description="detail.name">
        <div class="title">版本详情</div>
    </Banner>

    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <div class="wrapper" v-if="!isLoading">
        <Card></Card>
    </div>

</template>