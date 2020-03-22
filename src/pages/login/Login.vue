<template>
    <BaseContainer>
        <span slot="principal">
            <v-container class="grey darken-2" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12 ">
                            <v-toolbar dark flat>
                                <v-toolbar-title>Controle Veicular</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                <v-text-field label="Email" name="login" prepend-icon="person" type="text"
                                    v-model="email"
                                />

                                <v-text-field id="password" label="Senha" name="password" v-model="password"
                                    prepend-icon="lock" type="password"/>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="pink darken-1" style="color: white" @click="login">Entrar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-snackbar v-model="snackbar" color="red">
                Email ou senha inválido
                <v-btn color="white" text @click="snackbar=false">Fechar</v-btn>
            </v-snackbar>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Login',
    data: () => ({
        email: 'questor@example_email.com',
        password: 'questor123',
        snackbar: false,
    }),
    components: {
        BaseContainer
    },
    created() {
        this.$store.getters.getUsuario && this.$router.push('/');
    },
    methods: {
        login() {
            this.$http.post(this.$urlAPI + 'login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                if (response.data.status) {
                    this.$store.commit('setUsuario', response.data.usuario);
                    sessionStorage.setItem('usuario', JSON.stringify(response.data.usuario));
                    this.$router.push('/');
                } else if (response.data.status == false) {
                    this.snackbar = true;
                }
            })
            .catch(e => alert(e))
        }
    }
}
</script>

<style scoped>
.container  {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.container .row {
    margin: 0 auto;
}
</style>
