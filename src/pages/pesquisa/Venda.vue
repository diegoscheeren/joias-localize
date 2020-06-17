<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle">
        <span slot="principal">
            <v-content>
                <v-data-table fixed-header :headers="headers" :items="dados" class="elevation-0"
                    :mobileBreakpoint="0" :loading="loading" height="430px" @click:row="editar"
                    >
                    <template v-slot:item.data_venda="{ item }">
                        {{`${item.data_venda.split('-')[2]}/${item.data_venda.split('-')[1]}/${item.data_venda.split('-')[0]}`}}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon small color="red" @click.stop="confirmarExclusao(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-content>
            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">Confirmar exclusão</v-card-title>
                    <v-card-text>Tem certeza que deseja excluir?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" text @click="this.closeDialog">Cancelar</v-btn>
                        <v-btn color="red" text @click="this.excluir">Excluir</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Mostruario',
    data: () => ({
        loading: true,
        dados: [],
        dialog: false,
        excluirId: '',
        pageTitle: 'Vendas',
        actionBtn: {show: true, to: '/cadastro-venda'},
        headers: [
            {text: 'Cliente', value: 'cliente.nome', align: 'start'}, // start center end
            {text: 'Data', value: 'data_venda', align: 'center'},
            {text: 'Excluir', value: 'action', sortable: false, align: 'center', width: '10px' },
        ],
    }),
    mounted () {
        this.consultar();
    },
    methods: {
        consultar() {
            this.loading = true;
            this.$http.get(this.$urlAPI + 'venda')
                .then(resp => {
                    this.loading = false;
                    this.dados = resp.data.data;
                })
        },
        editar(row) {
            this.$store.commit('setData', {...row, ...{edit: true}});
            this.$router.push('/cadastro-venda');
        },
        confirmarExclusao(id) {
            this.excluirId = id;
            this.dialog = true;
        },
        excluir() {
            this.$http.delete(this.$urlAPI + 'venda', {data: {id: this.excluirId}})
                .then(() => this.consultar());
            this.closeDialog();
        },
        closeDialog() {
            this.excluirId = '';
            this.dialog = false;
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
