<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle" :backBtn="this.backBtn">
        <span slot="principal">
            <v-content>
                <v-tabs v-model="tab" centered dark>
                    <v-tabs-slider/>
                    <v-tab href="#tab-1">
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-tab>
                    <v-tab href="#tab-2">
                        <v-icon>mdi-diamond-stone</v-icon>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item key="1" value="tab-1">
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <input v-model="id" type="hidden">
                                <v-col cols="12">
                                    <v-select
                                        :items="this.clientes"
                                        label="Cliente" v-model="cliente_id"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="computedDateFormatted"
                                                label="Data"
                                                persistent-hint
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="data_venda"
                                            ref="data_venda"
                                            no-title
                                            @input="menu = false"
                                            locale="pt-br"
                                        />
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item key="2" value="tab-2">
                        <v-container fluid>
                            <v-content style="padding: 0">
                                <v-data-table
                                    fixed-header
                                    :headers="headers"
                                    :items="dados"
                                    :mobileBreakpoint="0"
                                    height="360px"
                                    class="elevation-0"
                                ></v-data-table>
                                <v-btn class="mx-2" fab dark color="indigo" @click="goToVendaItens"
                                    v-show="!this.isEdit" style="position: absolute;top: 295px; right: 0;">
                                    <v-icon dark>mdi-plus</v-icon>
                                </v-btn>
                            </v-content>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
            </v-content>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Venda',
    data: vm => ({
        id: '',
        cliente_id: '',
        data_venda: '',
        clientes: [],
        colaborador_id: '',
        isEdit: null,
        clearStore: true,
        tab: 'tab-1',
        headers: [
            {text: 'Descrição', value: 'descricao', align: 'start'}, // start center end
            {text: 'Quantidade', value: 'quantidade', align: 'center', width: '120px'},
            // {text: 'Excluir', value: 'action', sortable: false, align: 'center', width: '10px' },
        ],
        dados: [],
        pageTitle: '',
        actionBtn: {show: true, text: 'Salvar'},
        backBtn: {show: true, to: '/vendas'},
        menu: false,
        nascimento: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        rules: {
            required: value => !!value || 'Obrigatório',
        },
    }),
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.data_venda)
        },
    },
    watch: {
        nascimento () {
            this.dateFormatted = this.formatDate(this.data_venda)
        },
    },
    mounted() {
        this.setClientes();
        let dados = this.$store.getters.getData;
        let venda = dados.venda;
        this.colaborador_id = this.$store.getters.getUsuarioId;
        this.isEdit = Object.keys(dados).length && dados.edit;
        this.pageTitle = this.isEdit ? 'Editar venda' : 'Nova venda';

        if (venda) {
            this.dados = dados.venda.itens;
            this.colaborador_id = dados.venda.colaborador_id;
            this.cliente_id = dados.venda.cliente_id;
            this.data_venda = dados.venda.data_venda;

            this.tab = 'tab-2';
        }

        if (this.isEdit) {
            //  eslint-disable-next-line no-console
                    console.log(dados.cliente_id);
            this.id = dados.id;
            this.colaborador_id = dados.colaborador_id;
            this.cliente_id = dados.cliente_id;
            this.data_venda = dados.data_venda;
            !dados.itens && this.setVendaItens();

            // this.$store.commit('setData', {});
        }

        this.$root.$refs.component = {salvar: this.salvar};
    },
    components: {
        BaseContainer,
    },
    beforeDestroy() {
        this.clearStore && this.$store.commit('setData', {});
    },
    methods: {
        salvar() {
            // if (!this.validate()) {
            //     return;
            // }
            const d = {
                id: this.id,
                data_venda: this.data_venda,
                colaborador_id: this.colaborador_id,
                cliente_id: this.cliente_id,
                itens: this.dados
            };

            this.$http[!this.id ? 'post' : 'put'](this.$urlAPI + 'venda', d).then(resp => {
                resp.data.status && this.$router.push('/vendas');
            });
        },
        goToVendaItens() {
            this.$store.commit('setData', {
                venda: {
                    colaborador_id: this.colaborador_id,
                    cliente_id: this.cliente_id,
                    data_venda: this.data_venda,
                    itens: this.dados
                }
            });
            this.clearStore = false;
            this.$router.push('/venda-itens');
        },
        setVendaItens() {
            this.$http.put(this.$urlAPI + 'venda-itens', {id: this.id})
                .then(resp => this.dados = resp.data.data)
        },
        setClientes() {
            this.$http.get(this.$urlAPI + 'cliente')
            .then(resp => {
                resp.data.data.forEach(c => this.clientes.push({value: c.id, text: c.nome}))
            });
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
        validate() {
            const fields = [
                {field: this.nome, ref: 'nome', tab: '1', label: 'o Nome Completo'},
            ];

            let valid = fields.every(f => {
                if (!f.field) {
                    this.tab = `tab-${f.tab}`;
                    this.$store.commit('setSnackbar', {msg: `Informe ${f.label}`, status: false});
                    this.$nextTick(() => this.$refs[f.ref].focus());
                    return false;
                }
                return true;
            });

            if (!valid) {
                return false;
            }
            return true;
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
