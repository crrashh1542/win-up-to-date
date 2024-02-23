<script>
import { fluentProgressRing, provideFluentDesignSystem } from '@fluentui/web-components'
provideFluentDesignSystem().register(fluentProgressRing())

export default {
    name: 'WidgetLoadAnim'
}
</script>

<template>
    <div class="load absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full">
        <fluent-progress-ring class="m-auto w-16 h-16"></fluent-progress-ring>
        <p class="m-10 text-2xl text-center">数据加载中，请稍候</p>
    </div>
</template>