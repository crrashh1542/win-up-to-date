<script>
const navSections = [
    {
        "path": "/",
        "icon": "icon-home",
        "text": "主页"
    },
    {
        "path": "/category",
        "icon": "icon-tag",
        "text": "分类"
    },
    {
        "path": "/about",
        "icon": "icon-about",
        "text": "关于"
    }
]

export default {
    name: 'WidgetNavBar',
    data() {
        return { navSections }
    }
}
</script>

<template>
    <div class="nav flex flex-row fixed bottom-0 left-0 w-full">

        <router-link v-for="s in navSections" :to="s.path" 
            :key="s.value" class="inline text-center basis-1/3 py-2">

            <span class="icon block text-xl pt-1 pb-0.5" :class="s.icon"></span>
            <span class="block text-sm py-0.5">{{ s.text }}</span>

        </router-link>

    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.nav {
    display: var(--nav-display);
    background-color: @wu-color-bar;
    backdrop-filter: blur(3px);
    border-top: 1px solid @wu-color-split-line;
    .path-active { // router 活跃状态（处于当前页时）的配置 class
        color: @wu-color-theme;
    }
    .icon::before {
        height: 40px;
    }
}

// 适配
@media screen and (min-width: 650px) {
    .nav {
        --nav-display: none;
    }
}

@media screen and (max-width: 650px) {
    .nav {
        --nav-display: flex;
    }
}
</style>