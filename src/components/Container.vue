<script>
import Catalog from './widgets/Catalog.vue'
import Card from './widgets/Card.vue'
import data from '../data.json'

export default {
    name: 'MainContainer',
    components: { Catalog, Card },
    data() {
        return { data }
    }
}
</script>

<template>
    <div class="spacing"></div>

    <main>

        <div class="block" v-for="d in data" :key="d.category">
            <catalog>
                <span :class=d.style[0]></span>{{ d.category }}
            </catalog>

            <card :class=d.style[1]>
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">{{ d.codebase }}</div>
                    </div>
                </div>
            </card>

            <card :class=d.style[1]>
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">{{ d.branch }}</div>
                    </div>
                </div>
            </card>

            <card :class=d.style[1]>
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">{{ d.version }}</div>
                    </div>
                </div>
            </card>
        </div>

    </main>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
.spacing {
    width: 100%;
    padding: @wu-layout-nav-height 0 0;
}

main {
    display: block;
    width: 100%;
    margin: 0 !important;
    padding: var(--container-padding);

    .block {
        margin: 15px 0;

        span {
            margin-right: .75em;
        }
    }
}

/* 不同设备适配 -------- BEGIN */
@media screen and (max-width: 800px) { /* <=800px */
   main { --container-padding: 0 20px; }
}
@media screen and (min-width: 800px) { /* <=1024px && >800px */
   main { --container-padding: 0 20px; }
}

@media screen and (min-width: 1024px) { /* >1024px && <=1366px */
   main { --container-padding: 0 10%; }
}

@media screen and (min-width: 1366px) { /* >1366px */
   main { --container-padding: 0 15%; }
}
/* 不同设备适配 -------- END */
</style>