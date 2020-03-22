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
                                            <label>MARCAS</label>
                                        </v-col>
                                    </v-row>
                                    <v-data-table :headers="headers" :items="dados" sort-by="codigo" class="elevation-1"
                                        :loading="loading" no-data-text="Nenhum registro encontrado">
                                        <template v-slot:item.action="{ item }">
                                            <v-icon small class="mr-2" @click="editar(item)">mdi-pencil</v-icon>
                                            <v-icon small @click="excluir(item.id)">mdi-delete</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text link to="/">Voltar</v-btn>
                                    <v-btn text color="primary" link to="/cadastro-marca">Novo</v-btn>
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
        loading: true,
        dados: [],
        dialog: false,
        headers: [
            { text: 'Códgio', align: 'start', sortable: false, value: 'id' },
            { text: 'Marca', value: 'marca' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
    }),
    created () {
      this.consultar()
    },

    methods: {
        consultar() {
            this.loading = true;
            this.$http.get(this.$urlAPI + 'marca')
                .then(resp => {
                    this.loading = false;
                    this.dados = resp.data.data;
                })
        },
        editar(row) {
            this.$store.commit('setData', row);
            this.$router.push('/cadastro-marca');
        },
        excluir(id) {
            this.$http.delete(this.$urlAPI + 'marca', {data: {id}}).then(() => this.consultar())
        }
    },
    components: {
        BaseContainer
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
