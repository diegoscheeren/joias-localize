<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle" :backBtn="this.backBtn">
        <span slot="principal">
            <v-content>
                <v-tabs v-model="tab" centered dark>
                    <v-tabs-slider/>
                    <v-tab href="#tab-1">
                        <v-icon>mdi-bag-personal-outline</v-icon>
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
                                        :items="this.colaboradores"
                                        label="Colaborador(a)" v-model="colaborador"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        :items="[
                                            {text: 'Livre', value: 'livre'},
                                            {text: 'Consignado', value: 'consignado'},
                                            {text: 'Devolvido', value: 'devolvido'},
                                        ]"
                                        label="Status" v-model="status"
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
                                                label="Data de Consignação"
                                                persistent-hint
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="data_consignacao"
                                            ref="data_consignacao"
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
                                <v-btn class="mx-2" fab dark color="indigo" @click="goToMostruarioItens"
                                    style="position: absolute;top: 295px; right: 0;">
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
    name: 'Mostruario',
    data: vm => ({
        id: '',
        colaborador: '',
        status: '',
        data_consignacao: '',
        colaboradores: [],
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
        backBtn: {show: true, to: '/mostruarios'},
        menu: false,
        nascimento: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        rules: {
            required: value => !!value || 'Obrigatório',
        },
    }),
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.data_consignacao)
        },
    },
    watch: {
        nascimento () {
            this.dateFormatted = this.formatDate(this.data_consignacao)
        },
    },
    mounted() {
        this.setColaboradores();
        let dados = this.$store.getters.getData;
        let mostruario = dados.mostruario;
        this.isEdit = Object.keys(dados).length && dados.edit;
        this.pageTitle = this.isEdit ? 'Editar Mostruário' : 'Cadastrar Mostruário';

        if (mostruario) {
            this.dados = dados.mostruario.itens;
            this.colaborador = dados.mostruario.colaborador;
            this.status = dados.mostruario.status;
            this.data_consignacao = dados.mostruario.data_consignacao;

            this.tab = 'tab-2';
        }

        if (this.isEdit) {
            this.id = dados.id;
            this.colaborador = dados.colaborador_id;
            this.status = dados.status;
            this.data_consignacao = dados.data_consignacao;
            !dados.itens && this.setMostruarioItens();

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
                data_consignacao: this.data_consignacao,
                colaborador_id: this.colaborador,
                status: this.status,
                itens: this.dados
            };

            this.$http[!this.id ? 'post' : 'put'](this.$urlAPI + 'mostruario', d).then(resp => {
                resp.data.status && this.$router.push('/mostruarios');
            });
        },
        goToMostruarioItens() {
            this.$store.commit('setData', {
                mostruario: {
                    colaborador: this.colaborador,
                    status: this.status,
                    data_consignacao: this.data_consignacao,
                    itens: this.dados
                }
            });
            this.clearStore = false;
            this.$router.push('/mostruario-itens');
        },
        setMostruarioItens() {
            this.$http.put(this.$urlAPI + 'mostruario-itens', {id: this.id})
                .then(resp => {
                    //  eslint-disable-next-line no-console
                    console.log(resp.data.data);
                    this.dados = resp.data.data;
                })
        },
        setColaboradores() {
             this.$http.get(this.$urlAPI + 'colaborador')
                .then(resp => resp.data.data.forEach(c => this.colaboradores.push({value: c.id, text: c.name})))
        },
        formatDate (data_consignacao) {
            if (!data_consignacao) return null

            const [year, month, day] = data_consignacao.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (data_consignacao) {
            if (!data_consignacao) return null

            const [month, day, year] = data_consignacao.split('/')
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
