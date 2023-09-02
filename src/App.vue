<script>
// Crrashh1542 does not exist at all!

// 引入库
import 'normalize.css/normalize.css'
import { toRefs, reactive } from 'vue'

// 引入样式
import './assets/styles/reset.less'

// 引入组件
import Appbar from './components/Appbar.vue'
import Banner from './components/Banner.vue'
import Foo from './components/Footer.vue'
import Setting from './components/Setting.vue'

export default {
   name: 'App',
   components: { Appbar, Banner, Foo, Setting },
   setup() {
      // STEP1 ------ 设置初始值，避免出现 undefined
      let [oriFlightVisibility, oriBranchVisibility] = [true, true]
      let data = reactive({
         isShowFlight: oriFlightVisibility,
         isShowBranch: oriBranchVisibility
      })
      // 切换显示状态
      function setState(emitData) {
         // STEP2 ------ 获取子组件传递的信息 和 App 的 data 信息
         let [stateType, stateValue] = [emitData[0], emitData[1]]
         let [flightVisibility, branchVisibility] = [oriFlightVisibility, oriBranchVisibility]
         // STEP3 ------ 判断类型并改变值
         if (stateType === 'isShowFlight') {
            flightVisibility = stateValue
         } else if (stateType === 'isShowBranch') {
            branchVisibility = stateValue
         }
         // STEP4 ------ 对 data 数据做出替换
         data.isShowFlight = flightVisibility
         data.isShowBranch = branchVisibility
      }
      return { ...toRefs(data), setState }
   }
}

</script>

<template>
   <div class="bg-shade fixed top-0 left-0"></div>
   <Appbar class="z-30" />
   <Banner class="z-20" />
   <router-view :isShowFlight="isShowFlight" :isShowBranch="isShowBranch"></router-view>
   <Foo class="z-20" />
   <Setting class="z-50" @isShowFlight="setState" @isShowBranch="setState" />
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