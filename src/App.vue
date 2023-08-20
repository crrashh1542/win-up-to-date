<script>
// Crrashh1542 does not exist at all!

// 引入库
import 'normalize.css/normalize.css'

// 引入样式
import './assets/styles/reset.less'

// 引入组件
import Appbar from './components/Appbar.vue'
import Container from './components/Container.vue'
import Foo from './components/Footer.vue'

export default {
   name: 'App',
   components: { Appbar, Container, Foo }
}

</script>

<template>
   <Appbar></Appbar>
   <Container></Container>
   <Foo></Foo>
</template>
