import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';
import ptBr from './i18n/vuetify/pt-br';
import en from './i18n/vuetify/en';

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
  en: {
    $vuetify: en,
  },
  'pt-br': {
    $vuetify: ptBr,
  },
};

const i18n = new VueI18n({ locale: 'pt-br', messages });

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    dark: (localStorage.dark && localStorage.dark === 'true'),
    themes: {
      light: {
        accent: '#6565bf',
      },
      dark: {
        accent: '#6565bf',
      },
    },
  },
});
