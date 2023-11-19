<script>
const linkList =
   [{
      'name': '主页',
      'link': 'https://www.crrashh.com/',
      'type': 'link'
   }, {
      'name': '关于',
      'link': '/about',
      'type': 'route'
   }]

export default {
   name: 'MainAppbar',
   data() {
      return {
         title: 'Windows Up-to-Date',
         link: linkList
      }
   },
   methods: {
      dialogOpen(){
         let dialogEl = document.getElementById('setting')
         dialogEl.hidden = false
      }
   }
}
</script>

<template>
   <div class="appbar">

      <!-- 左侧标题 -->
      <router-link to="/" class="title">{{ title }}</router-link>

      <!-- 左右分隔 -->
      <div class="grow"></div>

      <!-- 右侧链接 -->
      <div class="external">
         <span v-for="i in link" :key="i.name">
            
            <!-- 如果类型是外部链接 → <a> -->
            <a v-if="i.type == 'link'" :href="i.link" 
               class="link item" target="_blank">{{ i.name }}</a>

            <!-- 如果类型是项目内路由 → <router-link> -->
            <router-link class="item" v-if="i.type == 'route'" :to="i.link">
               {{ i.name }}</router-link>
         </span>

         <span><!-- 保留节目，选项必须在！ -->
            <a href="#" class="item" @click="dialogOpen">选项</a>
         </span>
         
      </div>
   </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');
@import url('../assets/styles/adaption.less');

/* 初始化 -------- BEGIN */
.appbar {
   position: fixed;
   left: 0;
   top: 0;
   z-index: 999;
   width: 100%;
   height: @wu-layout-nav-height;
   line-height: @wu-layout-nav-height;
   background-color: @wu-color-nav;
   padding: 0 var(--container-padding);
   border-bottom: 1px solid @wu-color-split-line;
   backdrop-filter: blur(3px);
   display: flex;
   align-items: center;
   box-sizing: border-box;

   a {
      color: inherit;
   }

   .title {
      // 左侧标题栏
      font-weight: 500;
      font-size: 24px;
   }

   .title::after {
      display: none;
   }

   .external > span > a.item {
      // 链接
      margin: 0 15px;
      font-size: 17px;
      color: @wu-color-text-accent;
      display: var(--appbar-link-display);
   }
}

/* 初始化 -------- END */

// 亮色
@media screen and (prefers-color-swueme: light) {
   .appbar {
      background-color: @wu-color-nav;
   }
}

// 暗色
@media screen and (prefers-color-swueme: dark) {
   .appbar {
      background-color: rgba(0, 0, 0, .8);
   }
}

/* 不同设备端适配 */
@media screen and (min-width: 650px) {
   .appbar {
      --appbar-link-display: inline-block;
   }
}

@media screen and (max-width: 650px) {
   .appbar {
      --appbar-link-display: none;
   }
}</style>
