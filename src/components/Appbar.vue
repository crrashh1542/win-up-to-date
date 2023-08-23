<script>
const linkList =
   [{
      'name': '主页',
      'link': 'https://www.crrashh.com/'
   }, {
      'name': '下载站',
      'link': 'https://disk.crrashh.com/%F0%9F%96%A5%EF%B8%8F%20%E6%95%B0%E7%A0%81%E8%B5%84%E6%BA%90/%E7%94%B5%E8%84%91%20%E2%86%92%20Windows'
   }, {
      'name': 'GitHub',
      'link': 'https://github.com/crrashh1542/win-uptime'
   }]

import { provideFluentDesignSystem, fluentSwitch } from "@fluentui/web-components"
provideFluentDesignSystem().register(fluentSwitch())

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
         <fluent-switch class="switch">
            <label for="cap-switch">深色</label>
         </fluent-switch>
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
   padding: var(--container-padding);
   padding-top: 0;
   padding-bottom: 0;
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

   .spacer {
      // 左右分隔
      flex-grow: 1;
      display: var(--appbar-link-display);
   }

   .link {
      // 链接
      margin: 0 15px;
      font-size: 17px;
      color: @wu-color-nav-link;
      display: var(--appbar-link-display);
   }

   .switch {
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
@media screen and (min-width: 560px) {
   .appbar {
      --appbar-link-display: inline-block;
   }
}

@media screen and (max-width: 560px) {
   .appbar {
      --appbar-link-display: none;
   }
}</style>
