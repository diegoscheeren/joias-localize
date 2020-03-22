<template>
    <v-app id="menuLateral">
        <Menu :usuario="this.usuario"/>
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
            usuario: false
        }
    },
    created() {
        this.$vuetify.theme.dark = true;
        let user = this.$store.getters.getUsuario;
        if (user) {
            this.usuario = user;
        } else {
            (this.$route.path != '/login') && this.$router.push('/login');
        }
    },
    components: {
        Menu
    }
};
</script>
