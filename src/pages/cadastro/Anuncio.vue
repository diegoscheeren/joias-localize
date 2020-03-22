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
                                            <label v-if="this.isEdit">Edição de Anúncio</label>
                                            <label v-if="!this.isEdit">Cadastro de Anúncio</label>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <input v-model="id" type="hidden">
                                        <v-select label="Marca" dense :items="marcas" item-value="id" item-text="marca" v-model="marca" @change="setModelos"></v-select>
                                        <v-select label="Modelo" dense :items="modelos" item-value="id" item-text="modelo" v-model="modelo" :loading="modelosLoading"></v-select>
                                        <v-text-field label="Ano" v-model="ano"></v-text-field>
                                        <v-text-field label="Valor de Compra" v-model="valor_compra"></v-text-field>
                                        <v-text-field label="Valor de Venda" v-model="valor_venda"></v-text-field>
                                        <v-text-field label="Cor" v-model="cor"></v-text-field>
                                        <v-text-field label="Tipo combustível" v-model="tipo_combustivel"></v-text-field>
                                        <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="computedDateFormatted"
                                                    label="Data de Venda"
                                                    persistent-hint
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="data_venda" no-title @input="menu2 = false"/>
                                        </v-menu>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text link to="/anuncios">Cancelar</v-btn>
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
    name: 'Anuncio',
    data: vm => ({
        id: '',
        modelo: '',
        marca: '',
        marcas: [],
        modelos: [],
        ano: '',
        valor_compra: '',
        valor_venda: '',
        cor: '',
        tipo_combustivel: '',
        data_venda: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,
        modelosLoading: false,
        isEdit: null
    }),
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.data_venda)
        },
    },
    watch: {
        data_venda () {
            this.dateFormatted = this.formatDate(this.data_venda)
        },
    },
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.setMarcas();
        this.setModelos(dados.modelo.marca);

        if (this.isEdit) {
            this.id = dados.id;
            this.modelo = dados.modelo.id;
            this.marca = dados.modelo.marca;
            this.ano = dados.ano;
            this.valor_compra = dados.valor_compra;
            this.valor_venda = dados.valor_venda;
            this.cor = dados.cor;
            this.tipo_combustivel = dados.tipo_combustivel;
            this.data_venda = dados.data_venda;

            this.$store.commit('setData', {});
        }
    },
    components: {
        BaseContainer,
    },
    methods: {
        salvar() {
            let dados = {
                id: this.id,
                modelo: this.modelo,
                marca: this.marca,
                ano: this.ano,
                valor_compra: this.valor_compra,
                valor_venda: this.valor_venda,
                cor: this.cor,
                tipo_combustivel: this.tipo_combustivel,
                data_venda: this.data_venda,
            };

            if (this.id) {
                this.$http.put(this.$urlAPI + 'anuncio', dados)
                    .then(resp => {
                        if (resp.data.status) {
                            this.$router.push('/anuncios');
                        }
                    });
                return;
            }

            this.$http.post(this.$urlAPI + 'anuncio', dados)
                .then(resp => {
                    if (resp.data.status) {
                        this.$router.push('/anuncios');
                    }
                });
        },
        setMarcas() {
            this.$http.get(this.$urlAPI + 'marca').then(resp => (this.marcas = resp.data.data))
        },
        setModelos(marca) {
            this.modelosLoading = true;
            marca && this.$http.get(this.$urlAPI + 'modelo', marca).then(resp => {
                this.modelos = resp.data.data.filter(m => m.marca.id == marca)
                this.modelosLoading = false;
            })
        },
        formatDate (data_venda) {
            if (!data_venda) return null

            const [year, month, day] = data_venda.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (data_venda) {
            if (!data_venda) return null

            const [month, day, year] = data_venda.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
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
