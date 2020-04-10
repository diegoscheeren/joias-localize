<template>
    <BaseContainer>
        <span slot="principal">
            <v-content>
                <!-- <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-card>
                                <v-card-text align="center" justify="center">
                                    <v-row>
                                        <v-col cols="12">
                                            <label>ITENS</label>
                                        </v-col>
                                    </v-row> -->
                                     <!-- <div class="mt-1 text-center">
                                       Consulta de Itens
                                    </div> -->

                                    <div  class="mt-1 text-right">
                                        <!-- <v-spacer /> -->
                                        <!-- <v-btn text link to="/">Voltar</v-btn> -->
                                        <v-btn text color="primary" link to="/cadastro-item">Novo</v-btn>
                                    </div>



                                    <v-data-table fixed-header :headers="headers" :items="dados" sort-by="codigo" class="elevation-0"
                                        :mobileBreakpoint="0" :loading="loading" height="350px">
                                        <template v-slot:item.action="{ item }">
                                            <v-icon small class="mr-2" @click="editar(item)">mdi-pencil</v-icon>
                                            <v-icon small @click="excluir(item.id)">mdi-delete</v-icon>
                                        </template>
                                    </v-data-table>



                                <!-- </v-card-text>
                                <v-card-actions> -->

                               <!-- </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container> -->
            </v-content>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Item',
    data: () => ({
        loading: true,
        dados: [],
        dialog: false,
        headers: [
            { text: 'Códgio', align: 'start', sortable: false, value: 'codigo' },
            { text: 'Descrição', value: 'descricao' },
            { text: 'Valor', value: 'valor' },
            { text: 'Custo', value: 'custo' },
            { text: 'Estoque', value: 'estoque' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
    }),
    created () {
      this.consultar()
    },

    methods: {
        initialize () {
        },
        consultar() {
            this.loading = true;
            this.$http.get(this.$urlAPI + 'item')
                .then(resp => {
                    this.loading = false;
                    this.dados = resp.data.data;
                })
        },
        editar(row) {
            this.$store.commit('setData', row);
            this.$router.push('/cadastro-item');
        },
        excluir(id) {
            this.$http.delete(this.$urlAPI + 'item', {data: {id}})
                .then(() => {
                    this.consultar;
                })
        }
    },
    components: {
        BaseContainer
    },
    // methods: {
    //     salvar() {
    //         this.$http.post(this.$urlAPI + 'item', {
    //             id: this.id,
    //             codigo: this.codigo,
    //             descricao: this.descricao,
    //             custo: this.custo,
    //             valor: this.valor,
    //             estoque: this.estoque
    //         })
    //         .then(resp => {
    //             // eslint-disable-next-line no-console
    //             console.log(resp);
    //         });
    //     }
    // }
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
