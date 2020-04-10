<template>
    <span v-if="usuario">
        <v-navigation-drawer v-model="primaryDrawer.model" :temporary="true" app overflow>
            <v-list dense>

                <v-list-item link>
                    <v-list-item-avatar>
                    <img :src="'https://lh5.googleusercontent.com/-S9j52vd5Kxc/AAAAAAAAAAI/AAAAAAAAAAA/ZTjweUkxmX8/s36-c-k/photo.jpg'" alt="">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="'Diego Scheeren'" />
                        <v-list-item-subtitle v-text="'dscheeren@gmail.com'" />
                        <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider dark class="my-4"/>

                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-action>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Cadastros</v-list-item-title>
                        </v-list-item-content>
                    </template>

                     <v-list-item link to="/itens">
                        <v-list-item-action>
                            <v-icon>mdi-diamond-stone</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Peças</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link to="/colaboradores">
                        <v-list-item-action>
                            <v-icon>mdi-account-supervisor</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Colaboradores</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group> -->

                <v-list-item link to="/itens">
                    <v-list-item-action>
                        <v-icon>mdi-diamond-stone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Peças</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="">
                    <v-list-item-action>
                        <v-icon>mdi-bag-personal-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Mostruários</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="">
                    <v-list-item-action>
                        <v-icon>mdi-cash-usd-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Vendas</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/colaboradores">
                    <v-list-item-action>
                        <v-icon>mdi-account-tie</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Colaboradores</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="">
                    <v-list-item-action>
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Clientes</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider dark class="my-4"/>

                <v-list-item link to="" >
                    <v-list-item-action>
                        <v-icon color="red">mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon v-if="usuario" @click.stop="primaryDrawer.model = !primaryDrawer.model"/>
            <v-toolbar-title>
                <span>Olá {{usuario.name}}, bem vindo!</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn @click="logout" color="error">Sair</v-btn>
        </v-app-bar>
    </span>
</template>

<script>
export default {
    name: 'Menu',
    data: () => ({
        primaryDrawer: {
            model: null,
        },
    }),
    props: ['usuario'],
    methods: {
        logout() {
            this.$store.commit('setUsuario', null);
            sessionStorage.clear();
            this.$router.push('/login');
        }
    }
};
</script>
