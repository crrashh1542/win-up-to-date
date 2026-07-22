<script setup lang="ts">
import { useRouter } from 'vue-router'
import CloudDismiss48Icon from '@iconify-vue/fluent-color/cloud-dismiss-48'

import Button from '@/components/widgets/Button.vue'

const router = useRouter()
defineOptions({ name: 'ViewNotFound' })
</script>

<template>
    <div class="error">
        <CloudDismiss48Icon height="96px" />
        <h1>404 Not Found</h1>
        <p>( &gt; &lt; )&nbsp;&nbsp;Error！请求的内容不见了！</p>
        <br />
        <p>
            <Button @click="router.back()">返回上级</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button @click="router.push('/')">回到主页</Button>
        </p>
    </div>
</template>

<style lang="less" scoped>
.error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 1.5;
}
</style>
