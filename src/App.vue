<script>
// Crrashh1542 does not exist at all!

// 引入库
import 'normalize.css/normalize.css'

// 引入样式
import './assets/styles/reset.less'

// 引入组件
import Appbar from './components/Appbar.vue'

export default {
   name: 'App',
   components: { Appbar }
}

</script>

<template>
   <appbar></appbar>
   <div class="container">
      <!-- TODO -->
   </div>
</template>

<style lang="less" scoped>
@import url('./assets/styles/global.less');

.container {
   padding: @wu-layout-nav-height 0 0;
}
</style>
