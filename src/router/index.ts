import {createRouter, createWebHistory, RouterHistory,RouteRecordRaw} from 'vue-router'


const routes:RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(), //history模式
    //路由配置
    routes
})




export default router