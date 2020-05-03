import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import CadastroItem from '@/pages/cadastro/Item'
import Item from '@/pages/pesquisa/Item'
import CadastroColaborador from '@/pages/cadastro/Colaborador'
import Colaborador from '@/pages/pesquisa/Colaborador'
import CadastroCliente from '@/pages/cadastro/Cliente'
import Cliente from '@/pages/pesquisa/Cliente'
import CadastroMostruario from '@/pages/cadastro/Mostruario'
import Mostruario from '@/pages/pesquisa/Mostruario'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {requiresAuth: false}
        },
        {
            path: '/cadastro-item',
            name: 'CadastroItem',
            component: CadastroItem,
            meta: {requiresAuth: true}
        },
        {
            path: '/itens',
            name: 'Item',
            component: Item,
            meta: {requiresAuth: true}
        },
        {
            path: '/cadastro-colaborador',
            name: 'CadastroColaborador',
            component: CadastroColaborador,
            meta: {requiresAuth: true}
        },
        {
            path: '/colaboradores',
            name: 'Colaborador',
            component: Colaborador,
            meta: {requiresAuth: true}
        },
        {
            path: '/cadastro-cliente',
            name: 'CadastroCliente',
            component: CadastroCliente,
            meta: {requiresAuth: true}
        },
        {
            path: '/clientes',
            name: 'Cliente',
            component: Cliente,
            meta: {requiresAuth: true}
        },
        {
            path: '/cadastro-mostruario',
            name: 'CadastroMostruario',
            component: CadastroMostruario,
            meta: {requiresAuth: true}
        },
        {
            path: '/mostruarios',
            name: 'Mostruario',
            component: Mostruario,
            meta: {requiresAuth: true}
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('/login');
    else if (!requiresAuth && currentUser) next('/');
    else next();
});

export default router;
