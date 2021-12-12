<template>
    <v-container>
        <Loader v-show="this.loading" /> 

        <v-row v-show="!this.loading" class="flag-row" >
            <v-col md="12" class="px-4">
                <v-row no-gutters>
                    <v-col sm="12" lg="6" md="6" class="p-0 mr-3 flag">
                        <v-img class="flag" :src="flagData[21]" :alt="flagData[0]" />
                    </v-col>

                    <v-col md="6" sm="12" lg="6" class="text-left py-1 country-info" style="height: 242px">
                        <ul>
                            <li>
                                <span>Nome: {{ flagData[0] }}</span>
                            </li><br>

                            <li>
                                <span>Capital: {{ flagData[5] }}</span>
                            </li><br>

                            <li>
                                <span>Região: <a @click.prevent.stop="changeToHome(flagData[7]) " class="region" href="">{{ flagData[7] }}</a></span>
                            </li><br>

                            <li>
                                <span>Sub-região: {{ flagData[8] }}</span>
                            </li><br>

                            <li>
                                <span>População: {{ flagData[9] }}</span>
                            </li><br>

                            <li>
                                <span>
                                Linguas: <span v-for="(lang, key) in flagData[19]" :key="key">{{ lang.name }}, {{  }}</span>
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
import { mapState, mapMutations, mapActions } from 'vuex'

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
            this.flagData = this.$store.state.allFlags
            this.loading = false
            this.GET_BORDERS(this.flagData[15])
        }, 1500)
    },

    computed: {
        ...mapState(['allFlags'])
    },

    watch: {
        allFlags () {
            this.loading = true
            setTimeout(() => {
                this.flagData = this.allFlags
                this.GET_BORDERS(this.flagData[15])
                this.loading = false
            }, 700)
        }
    },

    methods: {
        ...mapMutations(['CHANGE_TYPE_OF_FILTER', 'CHANGING_FILTERED_TYPE']),
        ...mapActions(['GET_FLAGS', 'GET_BORDERS']),

        changeToHome (region) {
            const regionToFilter = region.toLowerCase()

            setTimeout(() => {
                this.CHANGE_TYPE_OF_FILTER({ type: 'region', textType: 'Região' })
                this.CHANGING_FILTERED_TYPE(regionToFilter)
                this.$store.commit('CHANGE_SELECTED_REGION_SEARCH', true)
            }, 200)
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style scoped>
.flag-row {
    margin-top: 96px;
}

@media screen and (max-width: 550px) {
    .flag-row {
        margin-top: 10px !important;
    }

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

</style>
