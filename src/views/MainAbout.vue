<script setup>
// 引入组件
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

import Card from '@/components/widgets/Card.vue'
import { aboutInfo } from '@/utils/parseRepoInfo'

const route = useRoute()
</script>

<template>
    <div class="u-banner" v-if="route.path == '/about'">关于项目</div>

    <p>如你所见，这是一个反映 Windows 系统各版本情况实时进展的统计<s>和一堆其它莫名其妙功能混一起的</s>站点。</p>
    <p>作者云萧自身也是一个 Windows Insider 爱好者，若你喜欢这个项目，给项目点个小星星吧！=≡Σ((( つ•̀ω•́)つ</p>

    <Card v-for="i in aboutInfo" :key="i.key" mode="block">
        <!-- 如果有外部链接，加 a 标签 -->
        <a v-if="i[3] !== undefined" :href="i[2]" target="_blank">
            <Icon :icon="i[1]" class="icon" />
            <span class="item">{{ i[0] }}</span>
            <span class="u-grow"></span>
            <span class="value">{{ i[3] }}</span>
        </a>

        <!-- 如果没有外部链接，加 span 标签 -->
        <div v-else>
            <Icon :icon="i[1]" class="icon" />
            <span class="item">{{ i[0] }}</span>
            <span class="u-grow"></span>
            <span class="value">{{ i[2] }}</span>
        </div>
    </Card>

    <p>
        本项目数据托管于<a href="https://github.com/crrashh1542/win-up-to-date/tree/data" target="_blank">公共维护的仓库</a>。 项目遵循
        <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">GPL-3.0 开源协议</a>，并仅限于作展示和交流学习用途。
    </p>

    <p>
        Windows 为 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 无关。项目采用的所有字体和图片均搜集自网络且仅用作学习，
        其版权归原公司所有；项目主页采用的图标来自 <a href="https://www.iconfont.cn">iconfont</a> 和 
        <a href="https://github.com/studio384/amicons">amicons</a>，其余所有图标来自 <a href="https://iconify.design">iconify</a>。
    </p>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.card {
    a, div {
        display: flex;
        font-size: 16px;
        line-height: 24px;

        .icon {
            font-size: 24px;
            margin-right: 18px;
        }

        .value {
            font-size: 16px;
            color: #666;
        }
    }
}
</style>
