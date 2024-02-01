<script>
import { provideFluentDesignSystem, fluentButton } from "@fluentui/web-components"
provideFluentDesignSystem().register(fluentButton())

export default {
    name: 'OtherNotFound',
    setup() {
        document.title = '内容不见啦！ / Windows Up-to-Date'
    },
    methods: {
        routerToHome() {
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <div class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-full text-center">
        <h1 class="text-4xl font-bold">404 NOT Found</h1>
        <p class="text-xl">前面的区域，以后再来探索吧！</p>
        <router-link to="/">
            <fluent-button class="text-lg">
                <span>回到主页</span>
            </fluent-button>
        </router-link>
    </div>
</template>
