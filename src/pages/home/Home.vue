<template>
    <BaseContainer>
        <span slot="principal">
            <v-content>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="10">
                            <v-card>
                                <v-card-text align="center" justify="center">
                                    <v-row>
                                        <v-col cols="12">
                                            <span>Utilize o <b>menu</b> no canto superior esquedo para acessar as funcionalidades!</span>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <!-- <v-card-actions>
                                    <v-spacer />
                                    <v-btn text>Cancel</v-btn>
                                    <v-btn text color="primary">Submit</v-btn>
                                </v-card-actions> -->
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
    name: 'Home',
    data: () => ({
    }),
    created() {
    },
    components: {
        BaseContainer
    },
    methods: {
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
