<template ref="item">
    <BaseContainer :actionBtn="this.actionBtn" :pageTitle="this.pageTitle" :backBtn="this.backBtn">
        <span slot="principal">
            <v-content>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12">
                            <input v-model="id" type="hidden">
                            <v-text-field label="Descrição" v-model="descricao"/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Valor Custo (R$)" v-model="valor_custo"
                                placeholder="0.00"
                                v-mask="['#.##','##.##','###.##','####.##','#####.##']">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Valor Venda (R$)" v-model="valor_venda"
                                placeholder="0.00"
                                v-mask="['#.##','##.##','###.##','####.##','#####.##']">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Estoque" v-model="estoque"/>
                        </v-col>
                        <v-col cols="6">
                            <v-select :items="this.categorias" label="Categoria" v-model="categoria"/>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                :items="[{text: 'Ouro', value: 'ouro'}, {text: 'Prata', value: 'prata'}]"
                                label="Banho" v-model="banho"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                :items="[{text: 'Feminino', value: 'f'}, {text: 'Masculino', value: 'm'}]"
                                label="Gênero" v-model="genero"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-file-input accept="image/*" @change="setImagem" label="Imagem" prepend-icon="mdi-camera"/>
                        </v-col>
                        <v-col cols="6">
                            <v-img :src="this.urlImagePreview" height="75" width="150"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </span>
    </BaseContainer>
</template>

<script>
import BaseContainer from '@/components/BaseContainer'

export default {
    name: 'Item',
    data: () => ({
        id: '',
        descricao: '',
        valor_custo: '',
        valor_venda: '',
        estoque: '',
        categoria: '',
        genero: 'f',
        banho: '',
        imagem: '',
        urlImagePreview: '',
        categorias: [
            {value: 'aneis', text: 'Anéis'},
            {value: 'brincos', text: 'Brincos'},
            {value: 'gargantilhas', text: 'Gargantilhas'},
            {value: 'pulseiras', text: 'Pulseira'},
            {value: 'tornozeleiras', text: 'Tornozeleiras'},
            {value: 'conjuntos', text: 'Conjuntos'},
            {value: 'pingentes', text: 'Pingentes'},
            {value: 'embalagens', text: 'Embalagens'},
        ],
        isEdit: null,
        pageTitle: '',
        actionBtn: {show: true, text: 'Salvar'},
        backBtn: {show: true, to: '/itens'},
    }),
    created() {
        let dados = this.$store.getters.getData;
        this.isEdit = Object.keys(dados).length;
        this.pageTitle = this.isEdit ? 'Editar Peça' : 'Cadastrar Peça'

        if (this.isEdit) {
            this.id = dados.id;
            this.descricao = dados.descricao;
            this.valor_custo = dados.valor_custo;
            this.valor_venda = dados.valor_venda;
            this.estoque = dados.estoque;
            this.categoria = dados.categoria;
            this.banho = dados.banho;
            this.genero = dados.genero;
            this.imagem = dados.imagem;

            this.$store.commit('setData', {});
        }

        this.$root.$refs.component = {salvar: this.salvar};
    },
    components: {
        BaseContainer,
    },
    methods: {
        salvar() {
            const d = {
                id: this.id,
                descricao: this.descricao,
                valor_custo: this.valor_custo,
                valor_venda: this.valor_venda,
                estoque: this.estoque,
                categoria: this.categoria,
                genero: this.genero,
                banho: this.banho,
                imagem: this.imagem
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
        },
        setImagem(e) {
            if (!e) {
                this.urlImagePreview = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = read => {
                this.imagem = read.target.result;
                this.urlImagePreview = URL.createObjectURL(e);
            }
            reader.readAsDataURL(e);
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
