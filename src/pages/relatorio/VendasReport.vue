<template>
    <BaseContainer>
        <span slot="principal">
            <v-content>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="11">
                            <v-card>
                                <v-card-text align="center" justify="center">
                                    <v-row>
                                        <v-col cols="12">
                                            <label>Relatório de Vendas</label>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-menu
                                                v-model="calendarInicial"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="dataInicialFormatada"
                                                        label="De"
                                                        persistent-hint
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="data_inicial" no-title @input="calendarInicial = false"/>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-menu
                                                v-model="calendarFinal"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="dataFinalFormatada"
                                                        label="Até"
                                                        persistent-hint
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="data_final" no-title @input="calendarFinal = false"/>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn text color="primary" @click="gerarPdf">Gerar PDF</v-btn>
                                </v-card-actions>
                            </v-card>
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
    name: 'VendasReport',
    data: vm => ({
        data_inicial: new Date().toISOString().substr(0, 10),
        data_final: new Date().toISOString().substr(0, 10),
        dataInicialFormatada: vm.formatDate(new Date().toISOString().substr(0, 10)),
        dataFinalFormatada: vm.formatDate(new Date().toISOString().substr(0, 10)),
        calendarInicial: false,
        calendarFinal: false,
    }),
    watch: {
        data_inicial () {
            this.dataInicialFormatada = this.formatDate(this.data_inicial)
        },
        data_final () {
            this.dataFinalFormatada = this.formatDate(this.data_final)
        },
    },
    components: {
        BaseContainer,
    },
    methods: {
        gerarPdf() {
            const dados = {
                'data_inicial': this.data_inicial,
                'data_final': this.data_final
            }
            this.$http.post(this.$urlAPI + 'venda', dados)
                .then(resp => {
                    var doc = this.jsPDF()
                    var stringHtml = resp.data.data;

                    // doc.setFontSize(16);
                    doc.text('Relatório de Vendas', 70, 15);
                    doc.fromHTML(stringHtml, 15, 15);

                    window.open(doc.output('bloburl'), '_blank');
                });


            // doc.text('<b>Hello world<b>!<i style="color: red">Hello world</i>', 10, 10)
            // doc.save('vendas.pdf')
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
    },
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
