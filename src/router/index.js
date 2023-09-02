import { createRouter, createWebHistory } from 'vue-router'

import Versions from '../views/Versions.vue'
import FeatureIds from '../views/FeatureIds.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Versions },
        { path: '/featureIds', component: FeatureIds }
    ]
})

export default router