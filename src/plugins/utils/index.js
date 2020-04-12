import Vue from 'vue';
import ufs from '../../assets/ufs';

const utils = {
    ufs,
};

Vue.use({
    install: (Vue) => {
        Vue.prototype.$utils = utils;
    },
});

export default utils;
