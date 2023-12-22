<script>
export default {
    name: 'MainBanner',
    props: {
        description: String
    }
}
</script>

<template>
    <div class="banner">
        <div class="title">
            <slot></slot>
        </div>
        <div class="subtitle">{{ description }}</div>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

.banner {
    padding: @wu-layout-nav-height 0 15px;
    margin: 30px 0 0;
    line-height: 1.25;
    .title {
        font-weight: @wu-font-catalog-weight;
        font-size: var(--banner-title);
        padding-bottom: .35em;
    }
    .subtitle {
        font-size: var(--banner-subtitle);
        color: #444;
    }
}

@media screen and (max-width: 800px) {
    .banner {
        --banner-title: 32px;
        --banner-subtitle: 24px;
    }
}
@media screen and (min-width: 800px) {
    .banner {
        --banner-title: 36px;
        --banner-subtitle: 24px;
    }
}
</style>