<script setup>
import { storeToRefs } from 'pinia'

import icons from '@/assets/icons'
import Card from '@/components/widgets/Card.vue'
import LoadAnim from '@/components/widgets/LoadAnim.vue'

import { useSettingsStore } from '@/stores/settings'
import { useBuildsStore } from '@/stores/latestBuilds'

const { settings } = storeToRefs(useSettingsStore())
const { list, isLoading } = storeToRefs(useBuildsStore())
useBuildsStore().fetchBuilds()
</script>

<template>
    <div class="u-banner">当前版本列表</div>
    <LoadAnim v-if="isLoading" mode="filled" />

    <!-- 内容块 BEGIN -->
        <div class="block" v-if="!isLoading" v-for="c in list" :key="c.id">

            <!-- 标题 -->
            <div class="u-catalog">
                <img :src="icons[c.icon]" class="u-box-s u-icon">&nbsp;
                {{ c.category }}
            </div>

            <!-- 内容卡片 -->
            <Card v-for="build in c.releases" :key="build.version" :class="build.style" mode="inline">
                <component :is="build.category !== undefined ? 'router-link' : 'span'"
                    v-bind="build.category !== undefined ? { to: '/detail/' + build.category + '/' + build.version } : {}">
                    <div class="row">
                        <!-- 左上标签 -->
                        <span :class="'channel u-float-l ' + build.style">{{ build.channel }}</span>
                        <!-- 右上代号 & 周期 -->
                        <span class="u-space-r u-float-r" v-if="settings.isShowFlight">
                            <img :src="icons.rocket" class="u-box-xs u-icon" />&nbsp;
                            {{ build.codename }} {{ build.semester }}
                        </span>
                    </div>
                    <!-- 版本号 -->
                    <div class="number">{{ build.version }}</div>
                    <!-- 分支 -->
                    <div class="row" v-if="settings.isShowBranch">
                        <img :src="icons.branch" class="u-box-xs u-icon"/>
                        {{ build.branch }}
                    </div>
                </component>
            </Card>
        </div>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.block {
    margin: 1em 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 7px;

    .u-catalog {
        grid-column: 1 / -1;
    }

    .card {
        padding: 10px 5px 10px 20px;
        border-radius: 8px;
        box-shadow: @wu-layout-shadow;

        .row {
            font-size: 16px;
            color: @wu-color-text-accent;
            overflow: hidden;
            vertical-align: middle;
            line-height: 1.5;
            .channel {
                font-size: 18px;
                font-weight: 500;
            }
        }
        .number {
            font-size: 25px;
            line-height: 32px;
            font-weight: 600;
            margin: 0 0 8px;
        }
    }
}

/* 频道颜色变化 ----- BEGIN */
.color-amber .channel {
    color: @wu-color-amber;
}
.color-orange .channel {
    color: @wu-color-orange;
}
.color-yellow .channel {
    color: @wu-color-yellow;
}
.color-green .channel {
    color: @wu-color-green;
}
.color-teal .channel {
    color: @wu-color-teal;
}
.color-theme .channel {
    color: @wu-color-blue;
}
.color-purple .channel {
    color: @wu-color-purple;
}
/* 频道颜色变化 ----- END */

</style>
