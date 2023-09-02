<script>
/* eslint-disable */

// 引入库
// import { reactive, toRefs } from 'vue'
// import axios from 'axios'
import {
    fluentAccordion, fluentAccordionItem,
    provideFluentDesignSystem
} from '@fluentui/web-components'
provideFluentDesignSystem().register(fluentAccordion(), fluentAccordionItem())
import data from '../feature_ids.json'

// 引入组件
import Catalog from '../components/Catalog.vue'
import Card from '../components/Card.vue'
import LoadAnim from '../components/LoadAnim.vue'

export default {
    name: 'ViewFeatureId',
    components: { Catalog, Card, LoadAnim },
    data() {
        return { data }
    }
    // setup() {
    //     // STEP1 ------ 设定初始值
    //     let data = reactive({
    //         data: [],
    //         isLoading: true
    //     })

    //     // STEP2 ------ 获取数据
    //     // 此处填写 Windows 最新数据的 API 地址，相关 API 方面，咕咕正在 TODO 状态中
    //     // 目前仅仅对 github.com/crrashh1542/win-up-to-date@data/data.json 做了反代而已
    //     axios.get('https://wutd.crrashh.com/api/getData')

    //         // STEP3 ------ 处理并修改数据
    //         .then(function(response) {
    //             data.data = response.data
    //             data.isLoading = false
    //         })
    //         .catch(function(error) {
    //             console.log(error)
    //         })

    //     // STEP4 ------ 返回数据
    //     return { ...toRefs(data) }
    // },
}
</script>

<template>
    <main>

        <!-- 加载动画 -->
        <!-- <LoadAnim v-if="isLoading" /> -->

        <!-- 内容块 -->
        <div class="block" v-for="d in data" :key="d.category" :id="d.category">
            <!-- 标题 -->
            <catalog>{{ d.category }}</catalog>
            <p class="description">
                分支: {{ d.detail.branch }} /
                版本: {{ d.detail.version }}
            </p>
            <p class="description">
                周期: {{ d.detail.period }} /
                频道: {{ d.detail.channel }}
            </p>

            <!-- 卡片 -->
            <fluent-accordion v-for="i in d.ids" :key="i.id">
                <fluent-accordion-item>
                    <span slot="heading" class="id">{{ i.id }}
                        <span class="feature">（{{ i.feature }}）</span>
                    </span>
                    <div class="panel">
                        <p class="feature">{{ i.feature }}</p>
                        <p>{{ i.description }}</p>
                    </div>
                </fluent-accordion-item>
            </fluent-accordion>
        </div>
    </main>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

main {
    display: block;
    width: 100%;
    padding: var(--container-padding);

    .block {
        margin: 15px 0;

        .description {
            font-size: 18px;
            margin-bottom: 10px;
        }

        fluent-accordion-item {
            margin: 2px 0;
            padding-left: 10px;
            font-size: 18px;
            box-shadow: 0 0 5px 0 #ddd;

            .row {
                width: 100%;
            }

            .id {
                font-weight: 500;
                color: @wu-color-text-imp;

                .feature {
                    display: var(--heading-feature-display);
                }
            }

            .panel {
                font-weight: normal;
                font-size: 16px;
                color: @wu-color-text-accent;

                p {
                    margin-bottom: 7px;
                }

                .feature {
                    font-weight: 600;
                    font-size: 18px;
                    display: var(--panel-feature-display);
                }
            }
        }
    }
}

/* 不同设备适配 */
@media screen and (max-width: 600px) {
    main {
        --heading-feature-display: none;
        --panel-feature-display: block;
    }
}
@media screen and (min-width: 600px) {
    main {
        --heading-feature-display: inline;
        --panel-feature-display: none;
    }
}
</style>