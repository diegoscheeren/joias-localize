<template>
    <Wildlife>
        <span slot="principal">
            <v-content>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-card>
                                <v-card-text align="center" justify="center">
                                    <v-row>
                                        <v-col cols="12">
                                            <label v-if="this.isEdit">Edição de Colaborador</label>
                                            <label v-if="!this.isEdit">Cadastro de Colaborador</label>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <input v-model="id" type="hidden">
                                        <v-text-field label="Código" v-model="codigo"></v-text-field>
                                        <v-text-field label="Descrição" v-model="descricao"></v-text-field>
                                        <v-text-field label="Custo" v-model="custo"></v-text-field>
                                        <v-text-field label="Valor" v-model="valor"></v-text-field>
                                        <v-text-field label="Estoque" v-model="estoque"></v-text-field>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text link to="/itens">Cancelar</v-btn>
                                    <v-btn text color="primary" @click="salvar">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </span>
    </Wildlife>
</template>

<script>
import Wildlife from '@/components/Wildlife'

export default {
    name: 'Item',
    data: () => ({
        id: '',
        codigo: '',
        descricao: '',
        custo: '',
        valor: '',
        estoque: '',
        isEdit: null
    }),
    created() {
        let dados = this.$store.getters.getData,
            isEdit = !!Object.keys(dados).length;

        // eslint-disable-next-line no-console
        console.log(isEdit);


        if (isEdit) {
            this.id = dados.id;
            this.codigo = dados.codigo;
            this.descricao = dados.descricao;
            this.custo = dados.custo;
            this.valor = dados.valor;
            this.estoque = dados.estoque;

            this.$store.commit('setData', {});
        }
    },
    components: {
        Wildlife,
    },
    methods: {
        salvar() {
            this.$http.post(this.$urlAPI + 'item', {
                id: this.id,
                codigo: this.codigo,
                descricao: this.descricao,
                custo: this.custo,
                valor: this.valor,
                estoque: this.estoque
            })
            .then(resp => {
                if (resp.data.status) {
                    this.$router.push('/itens');
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
