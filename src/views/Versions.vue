<script>
// 引入库
import { reactive, toRefs } from 'vue'
import axios from 'axios'

// 引入组件
import Catalog from '../components/Catalog.vue'
import Card from '../components/Card.vue'
import LoadAnim from '../components/LoadAnim.vue'

export default {
    name: 'ViewVersion',
    components: { Catalog, Card, LoadAnim },
    setup() {
        // STEP1 ------ 设定初始值
        let data = reactive({
            data: [],
            isLoading: true
        })

        // STEP2 ------ 获取数据
        // 此处填写 Windows 最新数据的 API 地址，相关 API 方面，咕咕正在 TODO 状态中
        // 目前仅仅对 github.com/crrashh1542/win-up-to-date@data/versions.json 做了反代而已
        axios.get('https://wutd.crrashh.com/api/getVersions')

            // STEP3 ------ 处理并修改数据
            .then(function (response) {
                data.data = response.data
                data.isLoading = false
            })
            .catch(function (error) {
                console.log(error)
            })

        // STEP4 ------ 返回数据
        return { ...toRefs(data) }
    },
    props: {
        // 接收 SettingDialog 传到父组件的数据
        isShowFlight: Boolean,
        isShowBranch: Boolean
    }
}
</script>

<template>
    <!-- 加载动画 -->
    <LoadAnim v-if="isLoading" />

    <!-- 内容块 -->
    <div class="block" v-for="d in data" :key="d.category" :id="d.category">
        <!-- 标题 -->
        <catalog>
            <span :class=d.style></span>{{ d.category }}
        </catalog>

        <!-- 卡片 -->
        <card v-for="r in d.releases" :key="r.name" :class=r.style>
            <div class="info">

                <div class="row">
                    <span class="category">{{ r.name }}<!-- 类型 --></span>
                    <span class="detail codename float-right" v-if="isShowFlight !== false">
                        {{ r.codename }} {{ r.period }} <!-- 周期代号 -->
                    </span>
                </div>

                <div class="version">{{ r.version }}<!-- 版本 --></div>

                <div class="row" v-if="r.branch !== undefined && isShowBranch !== false">
                    <span class="detail branch">{{ r.branch }}<!-- 分支 --></span>
                </div>
                <div class="row" v-else-if="isShowBranch !== false">
                    <span class="detail"></span>
                </div>

            </div>
        </card>
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

        .version {
            font-size: 24px;
            padding: 4px 0 10px;
            font-weight: 500;
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


/* 不同设备端适配 */

// SEC 1 ------ 两列
@media screen and (min-width: 1070px) {
    .card {
        --card-width: 32%;
    }
}

@media screen and (max-width: 1070px) {
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