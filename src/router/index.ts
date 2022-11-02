import {createRouter, createWebHistory, RouterHistory,RouteRecordRaw} from 'vue-router'


const routes:RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    
]

const router = createRouter({
    history: createWebHistory(), //history模式
    //路由配置
    routes
})




export default router