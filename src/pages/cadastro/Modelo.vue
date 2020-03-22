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
                                            <label v-if="this.isEdit">Edição de Modelo</label>
                                            <label v-if="!this.isEdit">Cadastro de Modelo</label>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <input v-model="id" type="hidden">
                                        <v-text-field label="Modelo" v-model="modelo"></v-text-field>
                                        <v-select label="Marca" dense :items="marcas" item-value="id" item-text="marca" v-model="marca"></v-select>
                                        <!-- <v-text-field label="Marca" v-model="marca"></v-text-field> -->
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text link to="/modelos">Cancelar</v-btn>
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
    name: 'Modelo',
    data: () => ({
        id: '',
        modelo: '',
        marca: '',
        marcas: [],
        isEdit: null
    }),
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;

        // eslint-disable-next-line no-console
        console.log(this.isEdit);

        if (this.isEdit) {
            this.id = dados.id;
            this.modelo = dados.modelo;
            this.marca = dados.marca;

            this.$store.commit('setData', {});
        }
        this.setMarcas();
    },
    components: {
        BaseContainer,
    },
    methods: {
        salvar() {
            this.$http.post(this.$urlAPI + 'modelo', {
                id: this.id,
                modelo: this.modelo,
                marca: this.marca,
            })
            .then(resp => {
                if (resp.data.status) {
                    this.$router.push('/modelos');
                }
                // eslint-disable-next-line no-console
                console.log(resp);
            });
        },
        setMarcas() {
            this.$http.get(this.$urlAPI + 'marca').then(resp => (this.marcas = resp.data.data))
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
