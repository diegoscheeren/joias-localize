<template>
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle" :backBtn="this.backBtn">
        <span slot="principal">
            <v-content>
                <v-tabs v-model="tab" centered dark>
                    <v-tabs-slider/>
                    <v-tab href="#tab-1">
                        <v-icon>mdi-account-box</v-icon>
                    </v-tab>
                    <v-tab href="#tab-2">
                        <v-icon>mdi-phone</v-icon>
                    </v-tab>
                    <v-tab href="#tab-3">
                        <v-icon>mdi-home</v-icon>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item key="1" value="tab-1">
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <input v-model="id" type="hidden">
                                <input v-model="colaborador_id" type="hidden">
                                <v-col cols="12">
                                    <v-text-field label="Nome Completo" ref="nome" v-model="nome" :rules="[rules.required]"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="RG" ref="rg" v-model="rg"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="CPF" v-model="cpf" ref="cpf"
                                        v-mask="['###.###.###-##']">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item key="2" value="tab-2">
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-text-field label="Telefone" v-model="telefone" ref="telefone"
                                        v-mask="['(##) # #### ####']">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field ref="email" label="E-mail" v-model="email" :rules="[rules.email]"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item key="3" value="tab-3">
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                 <v-col cols="6">
                                    <v-text-field label="CEP" v-model="cep" v-mask="['#####-###']"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        :items="this.ufs"
                                        label="UF" v-model="uf"
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Município" v-model="municipio"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Bairro" v-model="bairro"/>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Endereço" v-model="endereco"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Número" v-model="numero"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Complemento" v-model="complemento"/>
                                </v-col>
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
import utils from '../../plugins/utils';
import {db} from '../../firebase'
import firebase from 'firebase'

export default {
    name: 'Item',
    data: () => ({
        id: '',
        colaborador_id: '',
        email: '',
        nome: '',
        rg: '',
        cpf: '',
        telefone: '',
        uf: '',
        cep: '',
        municipio: '',
        numero: '',
        bairro: '',
        endereco: '',
        complemento: '',
        ufs: [],
        isEdit: null,
        tab: null,
        pageTitle: '',
        actionBtn: {show: true, text: 'Salvar'},
        backBtn: {show: true, to: '/clientes'},
        rules: {
            required: value => !!value || 'Obrigatório',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'E-mail inválido'
            },
        },
    }),
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.pageTitle = this.isEdit ? 'Editar Cliente' : 'Cadastrar Cliente'
        this.colaborador_id = firebase.auth().currentUser.uid;

        //  eslint-disable-next-line no-console
        // console.log(firebase.auth().currentUser.uid);

        if (this.isEdit) {
            this.id = dados.id;
            this.email = dados.email;
            this.nome = dados.nome;
            this.rg = dados.rg;
            this.cpf = dados.cpf;
            this.telefone = dados.telefone;
            this.cep = dados.cep;
            this.uf = dados.uf;
            this.municipio = dados.municipio;
            this.numero = dados.numero;
            this.bairro = dados.bairro;
            this.endereco = dados.endereco;
            this.complemento = dados.complemento;

            this.$store.commit('setData', {});
        }

        utils.ufs.forEach(uf => this.ufs.push({text: uf.nome, value: uf.sigla}));

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
                colaborador_id: this.colaborador_id,
                email: this.email,
                nome: this.nome,
                rg: this.rg,
                cpf: this.cpf,
                telefone: this.telefone,
                cep: this.cep,
                uf: this.uf,
                municipio: this.municipio,
                bairro: this.bairro,
                endereco: this.endereco,
                numero: this.numero,
                complemento: this.complemento,
            };

            !this.id && (d.id = db.collection('clientes').doc().id);
            db.collection('clientes').doc(d.id)[!this.id ? 'set' : 'update'](d).then(() => this.$router.push('/clientes'));

            // this.$http[!this.id ? 'post' : 'put'](this.$urlAPI + 'cliente', d).then(resp => {
            //     resp.data.status && this.$router.push('/clientes');
            // });
        },
        validate() {
            const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.email && !email.test(this.email)) {
                this.$store.commit('setSnackbar', {msg: 'E-mail iválido', status: false});
                this.$nextTick(() => this.$refs.email.focus())
                return false;
            }

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
