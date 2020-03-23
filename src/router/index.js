import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import CadastroMarca from '@/pages/cadastro/Marca'
import Marca from '@/pages/pesquisa/Marca'
import CadastroModelo from '@/pages/cadastro/Modelo'
import Modelo from '@/pages/pesquisa/Modelo'
import CadastroAnuncio from '@/pages/cadastro/Anuncio'
import Anuncio from '@/pages/pesquisa/Anuncio'
import VendasReport from '@/pages/relatorio/VendasReport'

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
            path: '/cadastro-marca',
            name: 'CadastroMarca',
            component: CadastroMarca
        },
        {
            path: '/marcas',
            name: 'Marca',
            component: Marca
        },
        {
            path: '/cadastro-modelo',
            name: 'CadastroModelo',
            component: CadastroModelo
        },
        {
            path: '/modelos',
            name: 'Modelo',
            component: Modelo
        },
        {
            path: '/cadastro-anuncio',
            name: 'CadastroAnuncio',
            component: CadastroAnuncio
        },
        {
            path: '/anuncios',
            name: 'Anuncio',
            component: Anuncio
        },
        {
            path: '/relatorio-vendas',
            name: 'VendasReport',
            component: VendasReport
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
