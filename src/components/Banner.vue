<script>
export default {
    name: 'MainBanner'
}
</script>

<template>
    <div class="banner">
        <div class="title">Windows Up-to-Date</div>
        <div class="subtitle">一个反映 Windows 系统各版本情况实时进展的统计站点</div>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

.banner {
    padding: @wu-layout-nav-height 0 8%;
    margin: 30px 0 10px;
    line-height: 1.25;
    .title {
        font-weight: @wu-font-catalog-weight;
        font-size: var(--banner-title);
        padding-bottom: .5em;
    }
    .subtitle {
        font-size: var(--banner-subtitle);
        color: #444;
    }

    p {
        line-height: 1.7;
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
        --banner-title: 42px;
        --banner-subtitle: 30px;
    }
}
</style>