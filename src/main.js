import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store'
import router from './router'
import firebase from 'firebase'
import VueTheMask from 'vue-the-mask'
import vuetify from './plugins/vuetify'
import './firebase'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

let vue = null;

Vue.config.productionTip = false

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';

Vue.config.productionTip = false

Vue.use(VueTheMask)
Vue.use(vuetify, {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
});

Vue.prototype.$serverUrl = `http://${window.location.hostname}:8000/`;
Vue.prototype.$http = axios
Vue.prototype.$urlAPI = ((window.location.hostname == 'localhost')
    ? `http://${window.location.hostname}:8000/api/`
    : `https://wildlife-api.herokuapp.com/api/`)

firebase.auth().onAuthStateChanged(() => {
    if (!vue) {
        vue = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
});
