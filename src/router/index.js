import Vue from 'vue'
import VueRouter from 'vue-router'
// import AV from 'leancloud-storage'
// import { Toast } from 'vant'

// const authFilter = (to, from, next) => {
//     if (AV.User.current()) {
//         next()
//     } else {
//         next({
//             path: '/login'
//         })
//     }
// }

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/news',
        name: 'news',
        component: () => import('../views/News.vue')
    },
    {
        path: '/news-details',
        name: 'newsDetails',
        component: () => import('../views/NewsDetails.vue')
    },
    {
        path: '/novice',
        name: 'novice',
        component: () => import('../views/Novice.vue')
    },
    {
        path: '/novice-details',
        name: 'novice-details',
        component: () => import('../views/NoviceDetails.vue')
    },
    {
        path: '/quotation',
        name: 'quotation',
        component: () => import('../views/Quotation.vue')
    },
    {
        path: '/quotation/:id',
        name: 'quotationDetails',
        component: () => import('../views/QuotationDetails.vue')
    },
    {
        path: '/column-list',
        name: 'columnList',
        component: () => import('../views/ColumnList.vue')
    },
    {
        path: '/column-details/:id',
        name: 'columnDetails',
        component: () => import('../views/ColumnDetails.vue')
    },
    {
        path: '/column-news/:id',
        name: 'columnNews',
        component: () => import('../views/ColumnNews.vue')
    }
]

const router = new VueRouter({
    // mode: 'hash',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    // 跳转页面回到顶部
    window.scrollTo(0, 0)
    document.body.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
})
Vue.use(VueRouter)

export default router
