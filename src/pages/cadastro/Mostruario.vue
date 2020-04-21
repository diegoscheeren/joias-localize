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
                            <v-row align="center" justify="center">
                                <!-- <v-col cols="12">
                                    <v-text-field label="Telefone" v-model="telefone" ref="telefone"
                                        v-mask="['(##) # #### ####']">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field ref="email" label="E-mail" v-model="email" :rules="[rules.email]"/>
                                </v-col> -->
                            </v-row>
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
    name: 'Item',
    data: vm => ({
        id: '',
        colaborador: '',
        status: '',
        data_consignacao: '',
        colaboradores: [],
        isEdit: null,
        tab: null,
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
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.pageTitle = this.isEdit ? 'Editar Mostruário' : 'Cadastrar Mostruário'

        if (this.isEdit) {
            this.id = dados.id;

            this.$store.commit('setData', {});
        }

        this.$root.$refs.component = {salvar: this.salvar};
    },
    components: {
        BaseContainer,
    },
    methods: {
        salvar() {
            if (!this.validate()) {
                return;
            }
            const d = {
                id: this.id,
            };

            this.$http[!this.id ? 'post' : 'put'](this.$urlAPI + 'mostruario', d).then(resp => {
                resp.data.status && this.$router.push('/mostruarios');
            });
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
