import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Detail from "@/views/Detail";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/:repo/:tag',
        name: 'Detail',
        component: Detail
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = window.sessionStorage.getItem('Authorization')

    if (to.name !== 'Login') {
        if (isAuthenticated) {
            next();
        } else {
            next({name: 'Login'})
        }
    } else {
        if (isAuthenticated) {
            next({name: 'Home'});
        } else {
            next();
        }
    }
})


export default router
