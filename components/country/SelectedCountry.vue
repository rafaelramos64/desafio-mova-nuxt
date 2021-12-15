<template>
    <v-container>
        <Loader v-show="this.loading" /> 

        <v-row v-show="!this.loading" class="mt-5" >
            <v-col cols="12" class="px-4">
                <v-row no-gutters>
                    <v-col cols="12" md="5" class="px-0">
                        <v-img
                            class="flag"
                            :src="flagData.flag"
                            :lazy-src="flagData.flag"
                            :alt="flagData.name"
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
                    </v-col>

                    <v-col cols="12" md="4" class="text-left pt-1 country-info" style="height: 242px">
                        <ul>
                            <li class="mb-5">
                                <span>Nome: {{ flagData.name }}</span>
                            </li>

                            <li class="mb-5">
                                <span>Capital: {{ flagData.capital }}</span>
                            </li>
                            <li class="mb-5">
                                <span>
                                    Região: 
                                    <a @click="changeToHome(flagData.region) " class="region" href="">{{ flagData.region }}</a>
                                </span>
                            </li>

                            <li class="mb-5">
                                <span>Sub-região: {{ flagData.subregion }}</span>
                            </li>

                            <li class="mb-5">
                                <span>População: {{ flagData.population }}</span>
                            </li>

                            <li>
                                <span>
                                    Linguas: <span v-for="(lang, key) in flagData.languages" :key="key">{{ lang.name }}, {{  }}</span>
                                </span>
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Loader from '@/components/Loader'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'SelectedCountry',
    components: { Loader },
    data () {
        return {
            flagData: [],
            loading: true
        }
    },

    mounted () {
        setTimeout(() => {
            this.flagData = this.getAllFlags

            this.loading = false
            this.ADD_BORDERS(this.flagData.borders)
        }, 1500)
    },

    computed: {
        ...mapGetters(['getAllFlags'])
    },

    watch: {
        getAllFlags () {
            this.loading = true
            setTimeout(() => {
                /* this.flagData = this.getAllFlags */

                this.ADD_BORDERS(this.flagData.borders)
                this.loading = false
            }, 700)
        }
    },

    methods: {
        ...mapActions([
            'ADD_BORDERS',
            'CHANGE_TYPE_OF_FILTER',
            'CHANGING_FILTERED_TYPE',
            'CHANGE_SELECTED_REGION_SEARCH'
        ]),

        changeToHome (region) {
            const regionToFilter = region.toLowerCase()

            setTimeout(() => {
                this.CHANGE_TYPE_OF_FILTER({ typeText: 'Região', typValue: 'region' })
                this.CHANGING_FILTERED_TYPE(regionToFilter)
                this.CHANGE_SELECTED_REGION_SEARCH(true)
            }, 200)
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style scoped>

@media screen and (max-width: 550px) {
    .country-info {
        margin-top: 10px !important;
    }
}

.flag {
    min-width: 443px;
    max-width: 443px;
    min-height: 258px;
    max-height: 258px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    padding: 0 !important;
}

ul {
    list-style-type: none !important;
    height: 242px;
    min-width: 213px;
    padding: 0 !important;
    margin: 0 !important;
}

.region {
    text-decoration: none;
}

</style>
