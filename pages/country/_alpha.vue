<template>
    <v-container fluid class="mx-12">
        <v-row class="mb-5">
            <v-col>
                <SelectedCountry />
            </v-col>
        </v-row><br />

        <v-row class="mt-4 mb-5">
            <Loader v-show="this.loading" />
            <v-col v-show="!this.loading">
                <NeighborsCountries />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "country",
    asyncData ({params}) {
        const alpha3Code = params.alpha
        return {
            alpha3Code
        }
    },

    data() {
        return {
            loading: true,
        };
  },

    mounted() {
        this.ADD_ALL_FLAGS({ type: 'alpha', filtered: this.alpha3Code })
        setTimeout(() => {
            this.loading = false;
        }, 1800);
    },

    methods: {
        ...mapActions(['ADD_ALL_FLAGS'])
    }
};
</script>

<style scoped>
</style>
