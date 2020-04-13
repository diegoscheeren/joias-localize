<template ref="item">
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
                                <v-col cols="12">
                                    <v-text-field label="E-Mail" v-model="email"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Senha" v-model="senha"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Confirmar Senha" v-model="confirm"/>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Nome Completo" v-model="nome"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="RG" v-model="rg"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="CPF" v-model="cpf"
                                        v-mask="['###.###.###-##']">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item key="2" value="tab-2">
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <v-col cols="6">
                                    <v-text-field label="Telefone" v-model="telefone"
                                        v-mask="['(##) # #### ####']">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Nacionalidade" v-model="nacionalidade"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Data de Nasc." v-model="nascimento"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        :items="this.estados_civis"
                                        label="Estado Civil" v-model="estado_civil"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Profissão" v-model="profissao"/>
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

export default {
    name: 'Item',
    data: () => ({
        id: '',
        email: '',
        senha: '',
        confirm: '',
        nome: '',
        rg: '',
        cpf: '',
        telefone: '',
        nacionalidade: 'Brasileiro(a)',
        nascimento: '',
        estado_civil: '',
        profissao: '',
        uf: '',
        cep: '',
        municipio: '',
        numero: '',
        bairro: '',
        endereco: '',
        complemento: '',
        ufs: [],
        estados_civis: [
            {text: 'Solteiro(a)', value: 's'},
            {text: 'União Estável', value: 'u'},
            {text: 'Casado(a)', value: 'c'},
            {text: 'Divorciado(a)', value: 'd'},
            {text: 'Viúvo(a)', value: 'v'},
        ],
        isEdit: null,
        tab: null,
        pageTitle: '',
        actionBtn: {show: true, text: 'Salvar'},
        backBtn: {show: true, to: '/colaboradores'},
    }),
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.pageTitle = this.isEdit ? 'Editar Colaborador(a)' : 'Cadastrar Colaborador(a)'

        if (this.isEdit) {
            this.id = dados.id;
            this.email = dados.email;
            this.senha = dados.senha;
            this.confirm = dados.confirm;
            this.nome = dados.nome;
            this.rg = dados.rg;
            this.cpf = dados.cpf;
            this.telefone = dados.telefone;
            this.nacionalidade = dados.nacionalidade;
            this.nascimento = dados.nascimento;
            this.estado_civil = dados.estado_civil;
            this.profissao = dados.profissao;
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
            const d = {
                id: this.id,
                email: this.email,
                senha: this.senha,
                confirm: this.confirm,
                nome: this.nome,
                rg: this.rg,
                cpf: this.cpf,
                telefone: this.telefone,
                nacionalidade: this.nacionalidade,
                nascimento: this.nascimento,
                estado_civil: this.estado_civil,
                profissao: this.profissao,
                cep: this.cep,
                uf: this.uf,
                municipio: this.municipio,
                bairro: this.bairro,
                endereco: this.endereco,
                numero: this.numero,
                complemento: this.complemento,
            };

            !this.id
                ? this.$http.post(this.$urlAPI + 'item', d).then(resp => {
                    if (resp.data.status) {
                        this.$router.push('/itens');
                    }
                })
                : this.$http.put(this.$urlAPI + 'item', d).then(resp => {
                    if (resp.data.status) {
                        this.$router.push('/itens');
                    }
                })
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
