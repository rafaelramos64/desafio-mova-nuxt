<template>
    <v-container fluid class="m-0">
        <v-row class="mb-5">
            <v-col class="p-0">
                <SelectedCountry />
            </v-col>
        </v-row><br />

        <v-row class="mt-4 mb-5 borders">
            <Loader v-show="this.loading" />
            <v-col v-show="!this.loading">
                <NeighborsCountries />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    components: { SelectedCountry, NeighborsCountries, Loader },
    name: "Country",
    data() {
        return {
            loading: true,
            params: this.$route.params.alpha,
        };
  },

    created() {
        setTimeout(() => {
            this.loading = false;
        }, 1800);
    },

    /* watch: {
        params() {
            console.log(this.params);
        },
    }, */
};
</script>

<style scoped>
    @media screen and (max-width: 550px) {
        .borders {
            margin-top: 0px !important;
            margin-bottom: 10px !important;
        }
    }
</style>
