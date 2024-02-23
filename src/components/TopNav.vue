<script setup>
defineOptions({ name: 'WidgetTopNav' })
</script>

<template>
    <div class="nav flex font-bold my-3 text-lg">
        <slot>
            <!-- 
                expected eles: 1. span.w-icon-left
                               2. span.grow
                               3. span.w-icon-right
            -->
        </slot>
    </div>
</template>

<style lang="less">
@import url('../assets/styles/global.less');
.nav {
    margin: 0 .4em 12px;
    color: #666;

    span.w-icon-left { float: left; }
    span.w-icon-left::before { margin-right: .4em; }
    span.w-icon-right { float: right; }
    span.w-icon-right::after { margin-left: .4em; }
}

</style>