import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null,
        data: {}
    },
    getters: {
        isAdmin: state => {
            return state.usuario.is_admin;
        },
        getUsuario: state => {
            return state.usuario;
        },
        getToken: state => {
            return state.usuario.token;
        },
        getData: state => {
            return state.data;
        }
    },
    mutations: {
        setUsuario(state, n) {
            state.usuario = n;
        },
        setData(state, data) {
            state.data = data;
        }
    },
    actions: {
    },
    modules: {
    }
})
