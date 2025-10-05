<script setup>
import { Icon } from '@iconify/vue'

let nav = defineProps(['data'])
let emit = defineEmits(['event'])

const refreshData = (obj) => {
   emit('event', obj)
}

</script>

<template>
   <div class="nav">

      <!-- 如果type是detail -->
      <router-link class="icon-left"
         v-if="nav.data.type == 'detail' && nav.data.prev != undefined"
         :to="nav.data.prev.route"
         @click="refreshData({
            platform: nav.data.prev.platform, 
            build: nav.data.prev.build })">
         <Icon icon="fluent:arrow-left-20-filled" />
         {{ nav.data.prev.build }} 
      </router-link>
      <!-- 如果type是categoryList -->
      <router-link class="icon-left"
         v-if="nav.data.type == 'categoryList' && nav.data.prev != undefined"
         :to="nav.data.prev.route"
         @click="refreshData({ platform: nav.data.prev.platform })">
         <Icon icon="fluent:arrow-left-20-filled" />
         {{ nav.data.prev.platform }} 
      </router-link>

      <span class="grow"></span>
      
      <!-- 如果type是detail -->
      <router-link class="icon-right"
         v-if="nav.data.type == 'detail' && nav.data.next != undefined"
         :to="nav.data.next.route"
         @click="refreshData({
            platform: nav.data.next.platform, 
            build: nav.data.next.build })">
         {{ nav.data.next.build }} <Icon icon="fluent:arrow-right-20-filled" />
      </router-link>
      <!-- 如果type是categoryList -->
      <router-link class="icon-left"
         v-if="nav.data.type == 'categoryList' && nav.data.next != undefined"
         :to="nav.data.prev.route"
         @click="refreshData({ platform: nav.data.next.platform })">
         <Icon icon="fluent:arrow-left-20-filled" />
         {{ nav.data.next.platform }} 
      </router-link>
   </div>
</template>

<style lang="less">
@import url('@/styles/global.less');

.nav {
   display: flex;
   color: #666;
   font-weight: 600;
   font-size: 17px;
   margin-bottom: 0.75rem;
   width: 100%;

   .icon-left {
      display: flex;
      align-items: center;
      svg {
         margin-right: .25em;
      }
   }
   .icon-right {
      display: flex;
      align-items: center;
      svg {
         margin-left: .25em;
         vertical-align: middle;
      }
   }
   .grow {
      flex-grow: 1;
   }
}
</style>