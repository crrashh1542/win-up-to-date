<script setup>
import { Icon } from '@iconify/vue'

let nav = defineProps(['data'])
let emit = defineEmits(['event'])

const refreshData = (platform, build) => {
   emit('event', platform, build)
}

</script>

<template>
   <div class="nav">

      <router-link class="icon-left" v-if="nav.data.prev != undefined"
         :to="nav.data.prev.route"
         @click="refreshData(nav.data.prev.platform, nav.data.prev.build)">
         <Icon icon="fluent:arrow-left-20-filled" />
         {{ nav.data.prev.build }}
      </router-link>

      <span class="grow"></span>
      
      <router-link class="icon-right" v-if="nav.data.next != undefined"
         :to="nav.data.next.route"
         @click="refreshData(nav.data.next.platform, nav.data.next.build)">
         {{ nav.data.next.build }} <Icon icon="fluent:arrow-right-20-filled" />
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