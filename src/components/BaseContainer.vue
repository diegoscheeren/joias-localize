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
    </v-app>
</template>

<script>
import Menu from '@/components/Menu';

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
    },
    props: ['pageTitle', 'actionBtn', 'backBtn'],
    components: {
        Menu
    }
};
</script>
