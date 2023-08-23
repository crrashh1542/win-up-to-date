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
    <main>

        <div class="block" v-for="d in data" :key="d.category" :id="d.category">
            <catalog>
                <span :class=d.style></span>{{ d.category }}
            </catalog>

            <card v-for="r in d.releases" :key="r.name" :class=r.style>
                <div class="info">
                    <div class="row">
                        <span class="category">{{ r.name }}</span>
                        <span class="detail codename float-right">{{ r.codename }} {{ r.period }}</span>
                    </div>
                    <div class="version">{{ r.version }}</div>
                    <div class="row" v-if="r.branch !== undefined">
                        <span class="detail branch">{{ r.branch }}</span>
                    </div>
                    <div class="row" v-else>
                        <span class="detail"></span>
                    </div>
                </div>
            </card>
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
    padding-top: @wu-layout-nav-height;

    .block {
        margin: 15px 0;

        span {
            margin-right: .75em;
        }
    }
}
/* 不同设备适配 -------- END */
</style>