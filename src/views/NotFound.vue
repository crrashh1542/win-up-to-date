<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import Button from '../components/widgets/Button.vue'

defineOptions({ name: 'ViewNotFound' })
</script>

<template>
    <div class="error">
        <h1>404 NOT Found</h1>
        <p>( > < )&nbsp;&nbsp;Error！这样我会出现困扰的！</p><br/>
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
