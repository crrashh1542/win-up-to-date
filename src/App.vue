<script>
// Crrashh1542 does not exist at all!

// 引入库
import 'normalize.css/normalize.css'
import { toRefs, reactive } from 'vue'

// 引入样式
import './assets/styles/reset.less'

// 引入组件
import Appbar from './components/Appbar.vue'
import Foo from './components/Footer.vue'
import Navi from './components/Navi.vue'
import Setting from './components/Setting.vue'

export default {
   name: 'App',
   components: { Appbar, Foo, Setting, Navi },
   setup() {

      // STEP1 ------ 设置卡片显示的初始值，避免出现 undefined
      let [oriFlightVisibility, oriBranchVisibility] = [true, true]
      let data = reactive({
         isShowFlight: oriFlightVisibility,
         isShowBranch: oriBranchVisibility
      })
      let [flightVisibility, branchVisibility] = [oriFlightVisibility, oriBranchVisibility]
      
      // 切换显示状态
      function setState(emitData) {
         // STEP2 ------ 获取子组件传递的信息 和 App 的 data 信息，0 是类型，1 是值
         let [stateType, stateValue] = [emitData[0], emitData[1]]

         // STEP3 ------ 判断类型并改变值
         if (stateType === 'isShowFlight') {
            flightVisibility = stateValue
         } else if (stateType === 'isShowBranch') {
            branchVisibility = stateValue
         }
         
         // STEP4 ------ 对 data 数据做出替换
         data.isShowFlight = flightVisibility
         data.isShowBranch = branchVisibility

         // console.log('flight ', data.isShowFlight, '\nbranch ', data.isShowBranch)
      }
      return { ...toRefs(data), setState }
   }
}

</script>

<template>
   <div class="bg-shade fixed top-0 left-0"></div>
   <Appbar class="z-30" />
   <main>
      <router-view :isShowFlight="isShowFlight" :isShowBranch="isShowBranch" />
   </main>
   <Foo class="z-20" />
   <Navi class="z-40"></Navi>
   <Setting class="z-50" @isShowFlight="setState" @isShowBranch="setState" />
</template>

<style scoped>
@import url('./assets/styles/adaption.less');
.bg-shade {
   width: 100%;
   height: 100%;
   z-index: -10;
   background-color: rgba(255, 255, 255, .87);
   backdrop-filter: blur(6px);
}

main {
   padding: 0 var(--container-padding);
   flex: 1;
}
</style>