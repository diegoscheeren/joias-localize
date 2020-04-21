import Vue from 'vue'
import VueRouter from 'vue-router'
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
            path: '/cadastro-colaborador',
            name: 'CadastroColaborador',
            component: CadastroColaborador
        },
        {
            path: '/colaboradores',
            name: 'Colaborador',
            component: Colaborador
        },
        {
            path: '/cadastro-cliente',
            name: 'CadastroCliente',
            component: CadastroCliente
        },
        {
            path: '/clientes',
            name: 'Cliente',
            component: Cliente
        },
        {
            path: '/cadastro-mostruario',
            name: 'CadastroMostruario',
            component: CadastroMostruario
        },
        {
            path: '/mostruarios',
            name: 'Mostruario',
            component: Mostruario
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
