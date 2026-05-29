<script setup lang="ts">
import './styles/reset.less'
import Wrapper from './components/Wrapper.vue'
import Toaster from './components/widgets/Toaster.vue'
</script>

<template>
    <Wrapper>
        <router-view></router-view>
    </Wrapper>
    <Toaster />
</template>
