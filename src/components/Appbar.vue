<script>
const linkList =
   [{
      'name': '主站',
      'link': 'https://www.crrashh.com/'
   },
   {
      'name': 'GitHub',
      'link': 'https://github.com/crrashh1542/win-uptime'
   }]

export default {
   name: 'MainAppbar',
   data() {
      return {
         title: 'Windows Uptime',
         link: linkList
      }
   }
}
</script>

<template>
   <div class="appbar">

      <!-- 左侧标题 -->
      <a href="" class="title">{{ title }}</a>

      <!-- 左右分隔 -->
      <div class="spacer"></div>

      <!-- 右侧链接 -->
      <div>
         <a v-for="i in link" :key="i.name" :href="i.link" class="link" target="_blank">{{ i.name }}</a>
      </div>
   </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

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
   padding: 20px;
   border-bottom: 1px solid #e2e2e2;
   backdrop-filter: blur(3px);
   display: flex;
   align-items: center;
   box-sizing: border-box;

   a {
      color: inherit;
   }

   .title {
      /* 左侧标题栏 */
      font-weight: 500;
      font-size: 24px;
   }

   .spacer {
      /* 左右分隔 */
      flex-grow: 1;
   }

   .link {
      /* 链接 */
      margin: 0 15px;
      font-size: 17px;
      color: @wu-color-nav-link;
   }

   .link::after {
      /* 链接图标 */
      color: @wu-color-nav-link;
      font-size: 15px;
      vertical-align: middle;
      text-align: center;
      margin-left: .4em;
      display: inline-block;
      content: '\e605';
   }

   .link:hover {
      color: @wu-color-theme-dark;
   }

   .link:hover::after {
      color: @wu-color-theme;
   }
}

/* 初始化 -------- END */

/* 亮色 -------- BEGIN */
@media screen and (prefers-color-swueme: light) {
   .appbar {
      background-color: @wu-color-nav;
   }
}

/* 亮色 -------- END */

/* 暗色 -------- BEGIN */
@media screen and (prefers-color-swueme: dark) {
   .appbar {
      background-color: rgba(0, 0, 0, .8);
   }
}

/* 暗色 -------- END */

/* 不同设备适配 -------- BEGIN */
@media screen and (max-width: 800px) {

   /* <=800px */
   .appbar .link {
      display: none;
   }
}

@media screen and (min-width: 800px) {

   /* <=1024px && >800px */
   .appbar {
      .icon {
         display: none;
      }
   }
}

@media screen and (min-width: 1024px) {

   /* >1024px && <=1366px */
   .appbar {
      padding: 0 10%;
   }
}

@media screen and (min-width: 1366px) {

   /* >1366px */
   .appbar {
      padding: 0 15%;
   }
}

/* 不同设备适配 -------- END */
</style>
