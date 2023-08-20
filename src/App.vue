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
   <h1>Hello, world!</h1>
</template>

<style scoped>

</style>
