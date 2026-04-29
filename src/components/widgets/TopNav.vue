<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface NavItem {
   route: string
   build: string
   platform: string
   path: string
}

interface NavData {
   type: 'detail' | 'platform'
   prev?: NavItem
   next?: NavItem
}

const props = defineProps<{ data: NavData }>()
const emit = defineEmits<{ event: [payload: { platform: string; build?: string }] }>()

const isDetail = computed(() => props.data.type === 'detail')

const buildLink = (source?: NavItem) => {
   if (!source) return null
   return {
      route: source.route,
      text: isDetail.value ? source.build : source.platform,
      payload: isDetail.value
         ? { platform: source.platform, build: source.build }
         : { platform: source.path }
   }
}

const prev = computed(() => buildLink(props.data.prev))
const next = computed(() => buildLink(props.data.next))
</script>

<template>
   <div class="nav">
      <router-link class="icon-left"
         v-if="prev"
         :to="prev.route"
         @click="emit('event', prev.payload)">
         <Icon icon="fluent:arrow-left-20-filled" />
         {{ prev.text }}
      </router-link>

      <span class="grow"></span>

      <router-link class="icon-right"
         v-if="next"
         :to="next.route"
         @click="emit('event', next.payload)">
         {{ next.text }}
         <Icon icon="fluent:arrow-right-20-filled" />
      </router-link>
   </div>
</template>

<style lang="less" scoped>
@import url('@/styles/global.less');

.nav {
   display: flex;
   color: #666;
   font-weight: 600;
   font-size: 17px;
   margin-bottom: 0.75rem;
   width: 100%;

   .icon-left, .icon-right {
      display: flex;
      align-items: center;
   }
   .icon-left svg {
      margin-right: .25em;
   }
   .icon-right svg {
      margin-left: .25em;
   }
   .grow {
      flex-grow: 1;
   }
}
</style>
