import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import CadastroItem from '@/pages/cadastro/Item'
import Item from '@/pages/pesquisa/Item'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
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
            path: '/cadastro-item',
            name: 'CadastroItem',
            component: CadastroItem
        },
        {
            path: '/itens',
            name: 'Item',
            component: Item
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
