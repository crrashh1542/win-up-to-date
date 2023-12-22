<script>
import { fluentProgressRing, provideFluentDesignSystem } from '@fluentui/web-components'
provideFluentDesignSystem().register(fluentProgressRing())

export default {
    name: 'MainLoadAnim'
}
</script>

<template>
    <div class="load text-center align-middle">
        <fluent-progress-ring class="m-auto"></fluent-progress-ring>
        <p>数据加载中，请稍候</p>
    </div>
</template>

<style lang="less">
.load {
    margin: 17% 0 !important;

    fluent-progress-ring {
        width: 64px;
        height: 64px;
    }

    p {
        font-size: 24px;
        margin: 30px;
    }
}
</style>