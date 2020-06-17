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
                                    <v-text-field ref="email" label="E-mail" v-model="email" :rules="[rules.required, rules.email]"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Senha"
                                        v-model="password"
                                        :rules="[rules.required]"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPassword ? 'text' : 'password'"
                                        @click:append="showPassword = !showPassword"
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Confirmar Senha"
                                        v-model="password_confirmation"
                                        ref="password_confirmation"
                                        :rules="[rules.required]"
                                        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showConfirm ? 'text' : 'password'"
                                        @click:append="showConfirm = !showConfirm"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Nome Completo" ref="nome" v-model="name"/>
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
                                <v-col cols="6">
                                    <v-text-field label="Telefone" v-model="telefone" ref="telefone"
                                        v-mask="['(##) # #### ####']">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="Nacionalidade" v-model="nacionalidade" ref="nacionalidade"/>
                                </v-col>
                                <v-col cols="6">
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
                                                label="Data de Nascimento"
                                                persistent-hint
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="nascimento"
                                            ref="nascimento"
                                            no-title
                                            @input="menu = false"
                                            locale="pt-br"
                                        />
                                    </v-menu>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                        :items="this.estados_civis"
                                        label="Estado Civil"
                                        v-model="estado_civil"
                                        ref="estado_civil"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Profissão" v-model="profissao" ref="profissao"/>
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
// import firebase from 'firebase'

export default {
    name: 'Item',
    data: vm => ({
        id: '',
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        rg: '',
        cpf: '',
        telefone: '',
        nacionalidade: 'Brasileiro(a)',
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
        showPassword: false,
        showConfirm: false,
        pageTitle: '',
        actionBtn: {show: true, text: 'Salvar'},
        backBtn: {show: true, to: '/colaboradores'},
        menu: false,
        nascimento: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        rules: {
            required: value => !!value || 'Obrigatório',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'E-mail inválido'
            },
        },
    }),
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.nascimento)
        },
    },
    watch: {
        nascimento () {
            this.dateFormatted = this.formatDate(this.nascimento)
        },
    },
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.pageTitle = this.isEdit ? 'Editar Colaborador(a)' : 'Cadastrar Colaborador(a)'

        if (this.isEdit) {
            this.id = dados.id;
            this.email = dados.email;
            this.name = dados.name;
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
            if (!this.validate()) {
                return;
            }
            const d = {
                // id: this.id,
                // email: this.email,
                // password: this.password,
                // password_confirmation: this.password_confirmation,
                name: this.name,
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

        //    firebase.auth().createUserWithEmailAndPassword('email@gmail.com', '12345678').then(user => {
        //         user.updateProfile({
        //             displayName: "Diegooooooo",
        //             photoURL: "https://example.com/jane-q-user/profile.jpg"
        //         })
        //    });
            // !this.id && (d.id = db.collection('itens').doc().id);
            // db.collection('itens').doc(d.id)[!this.id ? 'set' : 'update'](d).then(() => this.$router.push('/itens'));

            this.$http[!this.id ? 'post' : 'put'](this.$urlAPI + 'cadastro', d).then(resp => {
                resp.data.status && this.$router.push('/colaboradores');
            });
        },
        formatDate (nascimento) {
            if (!nascimento) return null

            const [year, month, day] = nascimento.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (nascimento) {
            if (!nascimento) return null

            const [month, day, year] = nascimento.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        validate() {
            const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!email.test(this.email)) {
                this.$store.commit('setSnackbar', {msg: 'E-mail iválido', status: false});
                this.$nextTick(() => this.$refs.email.focus())
                return false;
            }

            if (this.password !== this.password_confirmation) {
                this.$store.commit('setSnackbar', {msg: 'Senhas não conferem', status: false});
                this.$nextTick(() => this.$refs.password_confirmation.focus())
                return false;
            }

            const fields = [
                {field: this.name, ref: 'nome', tab: '1', label: 'o Nome'},
                {field: this.rg, ref: 'rg', tab: '1', label: 'o RG'},
                {field: this.cpf, ref: 'cpf', tab: '1', label: 'o CPF'},
                {field: this.telefone, ref: 'telefone', tab: '2', label: 'o Telefone'},
                {field: this.nacionalidade, ref: 'nacionalidade', tab: '2', label: 'a Nacionalidade'},
                {field: this.nascimento, ref: 'nascimento', tab: '2', label: 'o Nascimento'},
                {field: this.estado_civil, ref: 'estado_civil', tab: '2', label: 'o Estado Civil'},
                {field: this.profissao, ref: 'profissao', tab: '2', label: 'a Profissão'},
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

            if (!this.cep || !this.uf || !this.municipio || !this.bairro || !this.endereco) {
                this.tab = 'tab-3';
                this.$store.commit('setSnackbar', {msg: 'Informe os dados de endereço', status: false});
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
