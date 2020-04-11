<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle">
        <span slot="principal">
            <v-content>

                <v-data-table fixed-header :headers="headers" :items="dados" sort-by="codigo" class="elevation-0"
                    :mobileBreakpoint="0" :loading="loading" height="350px">
                    <template v-slot:item.action="{ item }">
                        <v-icon small class="mr-2" @click="editar(item)">mdi-pencil</v-icon>
                        <v-icon small @click="excluir(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>

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
        pageTitle: 'Itens',
        actionBtn: {show: true, to: '/cadastro-item', text: 'Novo'},
        headers: [
            { text: 'Códgio', align: 'start', sortable: false, value: 'codigo' },
            { text: 'Descrição', value: 'descricao' },
            { text: 'Valor', value: 'valor' },
            { text: 'Custo', value: 'custo' },
            { text: 'Estoque', value: 'estoque' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
    }),
    mounted () {
        this.consultar();
    },
    methods: {
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
                .then(() => this.consultar());
        }
    },
    components: {
        BaseContainer
    },
    //  eslint-disable-next-line no-console
    //  console.log(resp);
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
