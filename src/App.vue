<script>
// Crrashh1542 does not exist at all!

// 引入库
import 'normalize.css/normalize.css'

// 引入样式
import './assets/styles/reset.less'

// 引入组件
import Appbar from './components/Appbar.vue'
import Banner from './components/Banner.vue'
import Container from './components/Container.vue'
import Foo from './components/Footer.vue'

export default {
   name: 'App',
   components: { Appbar, Banner, Container, Foo }
}

</script>

<template>
   <div class="bg-shade fixed top-0 left-0"></div>
   <Appbar class="z-50"></Appbar>
   <Banner class="z-20"></Banner>
   <Container class="z-20"></Container>
   <Foo class="z-20"></Foo>
</template>

<style>
.bg-shade {
   width: 100%;
   height: 100%;
   z-index: -10;
   background-color: rgba(255, 255, 255, .87);
   backdrop-filter: blur(6px);
}
</style>