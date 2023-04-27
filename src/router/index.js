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
        path: '/phan-loai/:id',
        name: 'Category',
        component: () => import("@/views/Category.vue"),
    },
    {
        path: '/chi-tiet/:id',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: '/authors',
        name: 'Authors',
        component: () => import("@/views/Info.vue"),
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
        path: '/editor',
        name: 'Editor',
        component: () => import("@/views/Editor.vue"),
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
