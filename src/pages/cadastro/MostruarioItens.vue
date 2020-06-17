<template>
    <BaseContainer :actionBtn="this.actionBtn" :backBtn="this.backBtn" :pageTitle="this.pageTitle">
        <span slot="principal">
            <v-content>
                <v-data-table fixed-header :headers="headers" :items="dados" class="elevation-0"
                    :mobileBreakpoint="0" :loading="loading" height="430px" @click:row="soma"
                    >
                    <template v-slot:item.action="{ item }">
                        <v-btn dark small color="red" @click.stop="subtrai(item.id)">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                        <!-- <v-btn  fab dark small color="green">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn> -->
                    </template>
                    <template v-slot:item.quantidade="{ item }">
                        <v-avatar color="blue" size="20" v-if="item.quantidade">
                            <span class="white--text headline" style="font-size: 13px !important">{{item.quantidade}}</span>
                        </v-avatar>
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
    name: 'MostruarioItens',
    data: () => ({
        loading: true,
        dados: [],
        dialog: false,
        mostruario: '',
        excluirId: '',
        pageTitle: 'Vincular Peças',
        backBtn: {show: true, to: '/cadastro-mostruario'},
        actionBtn: {show: true, to: '/cadastro-mostruario'},
        headers: [
            {text: '', value: 'quantidade', sortable: false, align: 'center', width: '10px' },
            {text: 'Descrição', value: 'descricao', align: 'start'}, // start center end
            {text: 'Estoque', value: 'estoque', align: 'center', width: '100px'},
            {text: 'Ações', value: 'action', sortable: false, align: 'center', width: '10px' },
        ],
    }),
    mounted () {
        this.mostruario = this.$store.getters.getData.mostruario;
        this.consultar(this.mostruario.itens);
    },
    beforeDestroy() {
        this.mostruario.itens = this.dados.filter(d => d.quantidade > 0)
        this.$store.commit('setData', {mostruario: this.mostruario});
    },
    methods: {
        consultar(addedItems = []) {
            this.loading = true;
            this.dados = [];

            this.$http.get(this.$urlAPI + 'item')
                .then(resp => {
                    this.loading = false;
                    this.dados = resp.data.data.map(d => {
                        addedItems.forEach(i => {
                           if (d.id == i.id) {
                               d.quantidade = i.quantidade;
                               d.estoque -= i.quantidade;
                           }
                        });
                        !d.quantidade && (d.quantidade = 0);
                        //  eslint-disable-next-line no-console
                        // console.log(d);
                        return d;
                    });
                })
        },
        soma(item) {
            this.dados.forEach(d => {
                if (item.id == d.id && d.estoque > 0) {
                    d.quantidade++;
                    d.estoque--;
                }
            });
        },
        subtrai(id) {
            this.dados.forEach(d => {
                if (d.id == id && d.quantidade > 0) {
                    d.quantidade--;
                    d.estoque++;
                }
            });
        },
        confirmarExclusao(id) {
            this.excluirId = id;
            this.dialog = true;
        },
        excluir() {
            this.$http.delete(this.$urlAPI + 'item', {data: {id: this.excluirId}})
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
