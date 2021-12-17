<template>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown">
        <Loader v-show="loading" /> 

        <v-row v-show="!loading" class="mt-5">
            <v-col cols="12" :class="$vuetify.breakpoint.lgAndUp ? 'px-12' : ''">
                <v-row no-gutters>
                    <div>
                        <Flag selectedCountry :country="flagData" />
                    </div>

                    <v-col
                        cols="12"
                        md="4"
                        class="text-left pt-2 ml-5 country-info"
                        :class="$vuetify.breakpoint.mdAndDown ? 'd-flex justify-center' : ''"
                    >
                        <ul>
                            <li class="mb-5">
                                <span class="text-title-color">Nome:</span>
                                {{ flagData.name }}
                            </li>

                            <li class="mb-5">
                                <span class="text-title-color">Capital:</span>
                                {{ flagData.capital }}
                            </li>

                            <li class="mb-5 d-flex">
                                <span class="text-title-color">Região:</span>
                                <div @click="changeToHome(flagData.region)" class="region ml-1">
                                    {{ flagData.region }}
                                </div>
                            </li>

                            <li class="mb-5">
                                <span class="text-title-color">Sub-região:</span>
                                {{ flagData.subregion }}
                            </li>

                            <li class="mb-5">
                                <span class="text-title-color">População:</span>
                                {{ flagData.population }}
                            </li>

                            <li>
                                <span class="text-title-color">Linguas:</span>
                                <span v-for="(lang, key) in flagData.languages" :key="key">{{ lang.name }}, {{  }}</span>
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'SelectedCountry',
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
                this.flagData = this.getAllFlags

                this.ADD_BORDERS(this.flagData.borders)
                this.loading = false
            }, 700)
        }
    },

    methods: {
        ...mapActions([
            'ADD_BORDERS',
            'CHANGE_TYPE_OF_FILTER',
            'CHANGE_FILTERED_TYPE',
            'CHANGE_SELECTED_REGION_SEARCH',
            'ADD_ALL_FLAGS'
        ]),

        changeToHome (region) {
            const regionToFilter = region.toLowerCase()

            this.CHANGE_TYPE_OF_FILTER({ text: 'Região', value: 'region' })
            this.CHANGE_FILTERED_TYPE(regionToFilter)

            this.ADD_ALL_FLAGS({type: 'region', filtered: regionToFilter})
            this.CHANGE_SELECTED_REGION_SEARCH(true)

            this.$router.push({ name : 'index'})
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

ul {
    list-style-type: none !important;
    height: 242px;
    min-width: 213px;
    padding: 0 !important;
    margin: 0 !important;
}

.region {
    color: #6D2080;
}

.region:hover {
   text-decoration: underline;
   cursor: pointer;
}

.text-title-color {
    color: #02AE99;
    font-weight: bold;
}

.country-info {
    height: 242px;
}
</style>
