<script>
import Catalog from './widgets/Catalog.vue'

export default {
    name: 'MainContainer',
    components: { Catalog }
}
</script>

<template>
    <div class="container">
        <div class="block">
            <catalog>
                <span class="icon-chemical"></span>最新
            </catalog>
        </div>

        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 Canary
            </catalog>
        </div>

        <div class="block">
            <catalog><span class="icon-win11"></span>Windows 11 Dev</catalog>
        </div>

        <div class="block">
            <catalog><span class="icon-win11"></span>Windows 11 Beta</catalog>
        </div>

        <div class="block">
            <catalog><span class="icon-win11"></span>Windows 11 RP</catalog>
        </div>
        
        <div class="block">
            <catalog><span class="icon-win10"></span>Windows 10 RP</catalog>
        </div>

        <div class="block">
            <catalog><span class="icon-win11"></span>Windows 11 正式版</catalog>
        </div>

        <div class="block">
            <catalog><span class="icon-win10"></span>Windows 10 正式版</catalog>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.container {
    margin: var(--container-margin);
    padding: @wu-layout-nav-height 0 0;

    .block {
        margin: 30px 0;

        span {
            margin-right: .75em;
        }
    }
}

/* 不同设备适配 -------- BEGIN */
@media screen and (max-width: 800px) { /* <=800px */
   .container { --container-margin: 0 20px; }
}
@media screen and (min-width: 800px) { /* <=1024px && >800px */
   .container { --container-margin: 0 20px; }
}

@media screen and (min-width: 1024px) { /* >1024px && <=1366px */
   .container { --container-margin: 0 10%; }
}

@media screen and (min-width: 1366px) { /* >1366px */
   .container { --container-margin: 0 15%; }
}
/* 不同设备适配 -------- END */
</style>