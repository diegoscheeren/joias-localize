<template>
    <v-app id="menuLateral">
        <Menu
            :usuario="this.usuario"
            :actionBtn="this.actionBtn || {show: false, to: ''}"
            :pageTitle="this.pageTitle || ''"
            :backBtn="this.backBtn || {show: false, to: ''}"
        />
        <span>
            <slot name="principal" />
        </span>
        <Snackbar/>
    </v-app>
</template>

<script>
import Menu from '@/components/Menu';
import Snackbar from '@/components/Snackbar';

export default {
    name: 'BaseContainer',
    data() {
        return {
            usuario: false,
        }
    },
    created() {
        this.$vuetify.theme.dark = false;
        let user = this.$store.getters.getUsuario;
        if (user) {
            this.usuario = user;
        } else {
            (this.$route.path != '/login') && this.$router.push('/login');
        }

        // NOTIFICAÇÕES
        this.$http.interceptors.response.use(resp => {
            resp.data && resp.data.msg &&
                this.$store.commit('setSnackbar', {msg: resp.data.msg, status: resp.data.status});
            return resp;

        }, () => {}); // https://github.com/axios/axios/issues/266
    },
    props: ['pageTitle', 'actionBtn', 'backBtn'],
    components: {
        Menu,
        Snackbar
    }
};
</script>
