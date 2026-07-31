<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Branch16RegularIcon from '@iconify-vue/fluent/branch-16-regular'
import Calendar16RegularIcon from '@iconify-vue/fluent/calendar-16-regular'
import Rocket24RegularIcon from '@iconify-vue/fluent/rocket-24-regular'

import icons from '@/assets/icons'
import Card from '@/components/widgets/Card.vue'
import Spinner from '@/components/widgets/Spinner.vue'

import { useSettingsStore } from '@/stores/settings'
import { useBuildsStore } from '@/stores/apiLatestBuilds'

const { settings } = storeToRefs(useSettingsStore())
const { list, isLoading } = storeToRefs(useBuildsStore())
useBuildsStore().fetchBuilds()
</script>

<template>
    <div class="u-banner">当前版本列表</div>
    <Spinner v-if="isLoading" filled />

    <!-- 内容块 BEGIN -->
    <template v-for="c in list" :key="c.id">
        <div class="block" v-if="!isLoading">
            <!-- 标题 -->
            <div class="u-catalog">
                <img :src="icons[c.icon]" class="u-box-s u-icon" />&nbsp;
                {{ c.category }}
            </div>

            <!-- 内容卡片 -->
            <Card
                v-for="build in c.releases"
                :key="build.version"
                mode="inline"
                :shadow="true"
                class="u-hoverable"
            >
                <component
                    :is="build.category !== undefined ? 'router-link' : 'span'"
                    v-bind="
                        build.category !== undefined
                            ? {
                                  to: `/detail/${build.category}/${build.version}`,
                              }
                            : {}
                    "
                >
                    <div class="row">
                        <!-- 左上标签 -->
                        <span :class="['channel', `color-${build.color}`]">{{
                            build.channel
                        }}</span>
                        <!-- 右上代号 & 周期 -->
                        <span class="info" v-if="settings.isShowFlight">
                            <Rocket24RegularIcon width="22px" />
                            {{ build.codename }} {{ build.semester }}
                        </span>
                    </div>
                    <!-- 版本号 -->
                    <div class="number">{{ build.version }}</div>
                    <!-- 分支 -->
                    <div class="info" v-if="settings.isShowBranch">
                        <Branch16RegularIcon width="16px" />
                        {{ build.branch }}
                    </div>
                    <div class="info" v-if="settings.isShowDate">
                        <Calendar16RegularIcon width="16px" />
                        {{ build.date }}
                    </div>
                </component>
            </Card>
        </div>
    </template>
</template>

<style lang="less" scoped>
.block {
    margin: 1em 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 6px;

    .u-catalog {
        grid-column: 1 / -1;
    }

    .card {
        padding: 8px 18px;
        border-radius: 8px;

        .row {
            color: @wu-color-text-accent;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.5;
            .channel {
                font-size: 17px;
                font-weight: 500;
            }
        }
        .number {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 0.4em;
        }
        .info {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14px;
            color: @wu-color-text-accent;
            line-height: 1.6;
            gap: 4px;
        }
    }
}

/* 频道颜色变化 ----- BEGIN */
.channel.color-amber {
    color: @wu-color-amber;
}
.channel.color-orange {
    color: @wu-color-orange;
}
.channel.color-yellow {
    color: @wu-color-yellow;
}
.channel.color-green {
    color: @wu-color-green;
}
.channel.color-teal {
    color: @wu-color-teal;
}
.channel.color-blue {
    color: @wu-color-blue;
}
.channel.color-purple {
    color: @wu-color-purple;
}
/* 频道颜色变化 ----- END */
</style>
