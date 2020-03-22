<template>
    <BaseContainer>
        <span slot="principal">
            <v-content>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-card>
                                <v-card-text align="center" justify="center">
                                    <v-row>
                                        <v-col cols="12">
                                            <label v-if="this.isEdit">Edição de Marca</label>
                                            <label v-if="!this.isEdit">Cadastro de Marca</label>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <input v-model="id" type="hidden">
                                        <v-text-field label="Marca" v-model="marca"></v-text-field>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text link to="/marcas">Cancelar</v-btn>
                                    <v-btn text color="primary" @click="salvar">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Marca',
    data: () => ({
        id: '',
        marca: '',
        isEdit: null
    }),
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;

        // eslint-disable-next-line no-console
        console.log(this.isEdit);

        if (this.isEdit) {
            this.id = dados.id;
            this.marca = dados.marca;

            this.$store.commit('setData', {});
        }
    },
    components: {
        BaseContainer,
    },
    methods: {
        salvar() {
            this.$http.post(this.$urlAPI + 'marca', {
                id: this.id,
                marca: this.marca,
            })
            .then(resp => {
                if (resp.data.status) {
                    this.$router.push('/marcas');
                }
                // eslint-disable-next-line no-console
                console.log(resp);
            });
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
