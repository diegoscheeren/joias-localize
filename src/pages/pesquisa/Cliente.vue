<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle">
        <span slot="principal">
            <v-content>
                <v-data-table fixed-header :headers="headers" :items="dados" class="elevation-0"
                    :mobileBreakpoint="0" :loading="loading" height="430px" @click:row="editar"
                    >
                    <template v-slot:item.action="{ item }">
                        <v-icon small color="red" @click.stop="excluir(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-content>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Colaborador',
    data: () => ({
        loading: true,
        dados: [],
        dialog: false,
        pageTitle: 'Clientes',
        actionBtn: {show: true, to: '/cadastro-cliente'},
        headers: [
            {text: 'Nome', value: 'nome', align: 'start'}, // start center end
            {text: 'Município', value: 'municipio',  width: '120px'},
            {text: 'Excluir', value: 'action', sortable: false, align: 'center', width: '10px'},
        ],
    }),
    mounted () {
        this.consultar();
    },
    methods: {
        consultar() {
            this.loading = true;
            this.$http.get(this.$urlAPI + 'cliente')
                .then(resp => {
                    this.loading = false;
                    this.dados = resp.data.data;
                })
        },
        editar(row) {
            this.$store.commit('setData', row);
            this.$router.push('/cadastro-cliente');
        },
        excluir(id) {
            this.$http.delete(this.$urlAPI + 'cliente', {data: {id}})
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
