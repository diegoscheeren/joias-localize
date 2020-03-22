<template>
    <span v-if="usuario">
        <v-navigation-drawer v-model="primaryDrawer.model" :temporary="true" app overflow>
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider dark class="my-4"/>
                <v-list-item link to="/marcas">
                    <v-list-item-action>
                        <v-icon>mdi-alpha-m-box</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Marcas</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/modelos">
                    <v-list-item-action>
                        <v-icon>mdi-car-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Modelos</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/anuncios">
                    <v-list-item-action>
                        <v-icon>mdi-chart-bar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Anúncios</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider dark class="my-4"/>

                <v-list-item link @click="pdf">
                    <v-list-item-action>
                        <v-icon>mdi-file-pdf-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Relatório de Vendas</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon v-if="usuario" @click.stop="primaryDrawer.model = !primaryDrawer.model"/>
            <v-toolbar-title>
                <span>Olá {{usuario.name}}, bem vindo!</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn @click="logout" color="error">Sair</v-btn>
        </v-app-bar>
    </span>
</template>

<script>
export default {
    name: 'Menu',
    data: () => ({
        primaryDrawer: {
            model: null,
        },
    }),
    props: ['usuario'],
    methods: {
        logout() {
            this.$store.commit('setUsuario', null);
            sessionStorage.clear();
            this.$router.push('/login');
        },
        pdf() {
            var doc = this.jsPDF()

            var stringHtml = '<table style="width: 140%" border="1"><tr><td>teste</td></tr></table>';

            doc.setFontSize(16);
            doc.text('Relatório', 95, 15);
            doc.fromHTML(stringHtml, 15, 15, {
                'width': 100
            });

            window.open(doc.output('bloburl'), '_blank');

            // doc.text('<b>Hello world<b>!<i style="color: red">Hello world</i>', 10, 10)
            // doc.save('vendas.pdf')

        }
    }
};
</script>
