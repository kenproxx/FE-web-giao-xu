import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/chi-tiet/:id',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: '/info',
        name: 'Info',
        component: () => import("@/views/InfoPage.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/manager',
        name: 'Mangager',
        component: () => import("@/views/Manager.vue"),
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: () => import("@/views/post-manager/CreatePost.vue"),
    },
    {
        path: '/edit-post/:id',
        name: 'EditPost',
        component: () => import("@/views/post-manager/EditPost.vue"),
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
