<template>
    <v-snackbar :color="this.color" v-model="show">{{message}}</v-snackbar>
</template>

<script>

export default {
    name: 'Snackbar',
    data: () => ({
        show: false,
        message: '',
        color: 'success',
    }),
    created: function () {
        this.$store.watch(state => state.snackbar, snack => snack && this.showSnackbar(snack));
        let snack = this.$store.getters.getSnackbar;
        snack && this.showSnackbar(snack);
    },
    methods: {
        showSnackbar(snack) {
            if (!snack) {
                return;
            }
            this.message = snack.msg;
            this.color = snack.status ? 'success' : 'red';
            this.show = true;

            setTimeout(() => this.$store.commit('setSnackbar', ''), 100);
        }
    }
}
</script>