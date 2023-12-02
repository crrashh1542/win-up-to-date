<script>
import category from '../category.json'
import Banner from '../components/Banner.vue'

export default {
    name: 'MainCategory',
    components: { Banner },
    data() {
        return { category }
    }
}
</script>

<template>
    <Banner class="z-20">
        <div class="title">版本列表</div>
    </Banner>

    <table class="table-auto">
        <thead><tr>
            <th>版本</th>
            <th>发布时间</th>
        </tr></thead>
        <tbody>
            <tr v-for="c in category" :key="c[0]">
                <td v-for="item in c" :key="item.key">{{ item }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
@import url('../assets/styles/reset.less');
</style>