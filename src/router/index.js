import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Perfil from '@/pages/perfil/Perfil'
import CadastroItem from '@/pages/cadastro/Item'
import Item from '@/pages/pesquisa/Item'
import CadastroColaborador from '@/pages/cadastro/Colaborador'
import Colaborador from '@/pages/pesquisa/Colaborador'
import CadastroCliente from '@/pages/cadastro/Cliente'
import Cliente from '@/pages/pesquisa/Cliente'
import CadastroMostruario from '@/pages/cadastro/Mostruario'
import Mostruario from '@/pages/pesquisa/Mostruario'
import MostruarioItens from '@/pages/cadastro/MostruarioItens'
import CadastroVenda from '@/pages/cadastro/Venda'
import Venda from '@/pages/pesquisa/Venda'
import VendaItens from '@/pages/cadastro/VendaItens'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/cadastro-item',
            name: 'CadastroItem',
            component: CadastroItem,
        },
        {
            path: '/itens',
            name: 'Item',
            component: Item,
        },
        {
            path: '/cadastro-colaborador',
            name: 'CadastroColaborador',
            component: CadastroColaborador,
        },
        {
            path: '/colaboradores',
            name: 'Colaborador',
            component: Colaborador,
        },
        {
            path: '/cadastro-cliente',
            name: 'CadastroCliente',
            component: CadastroCliente,
        },
        {
            path: '/clientes',
            name: 'Cliente',
            component: Cliente,
        },
        {
            path: '/cadastro-mostruario',
            name: 'CadastroMostruario',
            component: CadastroMostruario,
        },
        {
            path: '/mostruarios',
            name: 'Mostruario',
            component: Mostruario,
        },
        {
            path: '/mostruario-itens',
            name: 'MostruarioItens',
            component: MostruarioItens,
        },
        {
            path: '/vendas',
            name: 'Venda',
            component: Venda,
        },
        {
            path: '/cadastro-venda',
            name: 'CadastroVenda',
            component: CadastroVenda,
        },
        {
            path: '/venda-itens',
            name: 'VendaItens',
            component: VendaItens,
        },
        {
            path: '/perfil',
            name: 'Perfil',
            component: Perfil,
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     const currentUser = firebase.auth().currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//     if (requiresAuth && !currentUser) next('/login');
//     else if (!requiresAuth && currentUser) next('/');
//     else next();
// });

export default router;
