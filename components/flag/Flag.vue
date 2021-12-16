<template>
    <v-tooltip top color="secondary">
        <template v-slot:activator="{ on, attrs }">
            <v-img
                class="country-img mb-3"
                :src="country.flag"
                :lazy-src="country.flag"
                :alt="country.name"
                v-bind="attrs"
                v-on="on"
                max-width="316"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="primary lighten-2"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </template>
        <span>{{ country.name }}</span>
    </v-tooltip>
</template>

<script>

export default {
    name: 'Flag',
    props: ['country'],

}
</script>

<style scoped>
@media screen and (max-width: 550px) {
    .country-img, .flag {
        width: 100% !important;
    }
}

.country-img {
    width: 316px;
    height: 181px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    padding: 0;
    object-fit: contain;
}
</style>