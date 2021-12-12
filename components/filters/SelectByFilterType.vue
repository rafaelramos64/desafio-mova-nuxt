<template>
    <div>
        <!-- <v-combobox
            v-if="getTypeOfFilter.typeValue === 'region'"
            v-model="selectedFilteredType"
            :label="`Escolha um(a) ${getTypeOfFilter.typeText}`"
        ></v-combobox> -->
            {{ getTypeOfFilter }}
        <v-combobox
            v-model="selectedFilteredType"
            :label="`Escolha um(a) ${getTypeOfFilter.typeText}`"
        ></v-combobox>
        <!-- <v-form-group
            :label="textTypeFiltered"
            label-for="filterByType">
            <v-form-select
                id="filterByType"
                @change="changeTypeFiltered()"
                v-model="selectedFilteredType"
                >
                <template #first>
                    <v-form-select-option selected :value="null" disabled>
                        Escolha uma {{ textTypeFiltered }}
                    </v-form-select-option>
                </template>

                <template v-if="this.getTypeOfFilter === 'region'">
                    <v-form-select-option
                        v-for="(region, index) in regions" :key="index" :value="region.value"
                        >
                        {{ region.text }}
                    </v-form-select-option>
                </template>

                <template v-if="this.getTypeOfFilter === 'capital'">
                    <v-form-select-option
                        v-for="(capital, index) in capitals" :key="index" :value="capital"
                        >
                        {{ capital }}
                    </v-form-select-option>
                </template>

                <template v-if="this.getTypeOfFilter === 'language' || this.getTypeOfFilter === 'lang'">
                    <v-form-select-option
                        v-for="(lang, index) in languages" :key="index" :value="lang.iso639_1"
                        >
                        {{ lang.name }}
                    </v-form-select-option>
                </template>

                <template v-if="this.getTypeOfFilter === 'country' || this.getTypeOfFilter === 'name'"
                >
                    <v-form-select-option
                        v-for="(country, index) in countries" :key="index" :value="country"
                    >
                        {{ country }}
                    </v-form-select-option>
                </template>

                <template v-if="this.getTypeOfFilter === 'callingcode'">
                    <v-form-select-option
                        v-for="(code, index) in callingCodes" :key="index" :value="code"
                    >
                        {{ code }}
                    </v-form-select-option>
                </template>
            </v-form-select>
        </v-form-group> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            selectedFilteredType: null,
            regions: [
                { text: 'Africa', value: 'africa' },
                { text: 'Americas', value: 'americas' },
                { text: 'Ásia', value: 'asia' },
                { text: 'Europa', value: 'europe' },
                { text: 'Oceania', value: 'oceania' }
            ],
            capitals: [],
            languages: [],
            countries: [],
            callingCodes: [],
            allCountries: [],
        }
    },

    created () {
        /* this.getTypeOfFilter.typeValue === 'region' ?
            this.selectedFilteredType = this.getTypeOfFilter.textValue :
                this.selectedFilteredType = null */
    },

    mounted () {
        this.getCountries()
        this.changeTypeFiltered()
    },

    computed: {
        ...mapGetters(['getTypeOfFilter', 'getFilteredType', 'getSelectedRegionSearch']),
    },

    watch: {
        getTypeOfFilter () {
            this.getFilters()
        },

        getFilteredType () {
            this.changeTypeFiltered()
        }
    },

    methods: {
        ...mapActions(['CHANGING_FILTERED_TYPE', 'CHANGE_TYPE_OF_FILTER', 'CHANGE_SELECTED_REGION_SEARCH']),

        async getCountries () {
            const { data } = await this.$axios.get('/all')
            this.allCountries = data
        },

        async changeTypeFiltered () {
            if (this.selectedRegionSearch) {
                this.selectedFilteredType = this.getFilteredType
                this.CHANGE_SELECTED_REGION_SEARCH(false)
            }
            if (this.getTypeOfFilter.typeValue === 'language') {
                this.this.CHANGE_TYPE_OF_FILTER({ type: 'lang', textType: this.getTypeOfFilter.typeText })
            } else if (this.getTypeOfFilter.typeValue === 'country') {
                this.CHANGE_TYPE_OF_FILTER({ type: 'name', textType: this.getTypeOfFilter.typeText })
            }

            this.CHANGING_FILTERED_TYPE(this.selectedFilteredType)
        },

        async getFilters () {
            if (this.selectedFilteredType !== null) {
                this.selectedfilteredType = null
            }

            if (this.getTypeOfFilter.typeValue === 'region') {

            } else if (this.getTypeOfFilter.typeValue === 'capital') {
                this.getAllCapitals()
            } else if (this.getTypeOfFilter.typeValue === 'language' || this.getTypeOfFilter.typeValue === 'lang') {
                this.getAllLanguages()
            } else if (this.getTypeOfFilter.typeValue === 'country' || this.getTypeOfFilter.typeValue === 'name') {
                this.getAllCountries()
            } else if (this.getTypeOfFilter.typeValue === 'callingcode') {
                this.getAllCallingCodes()
            }
        },

        async getAllCapitals () {
            const allCapitals = []

            for (const i in this.allCountries) {
                allCapitals.push(this.allCountries[i].capital)
            }
                this.capitals = allCapitals.filter(item => item !== '')
        },

        async getAllLanguages () {
            let allLanguages = []

            for (const langs of this.allCountries) {
                allLanguages.push(langs.languages)
            }

            allLanguages = allLanguages.flat(Infinity)
            const unikLanguages = []

            for (const i of allLanguages) {
                const languageExist = unikLanguages.find(elem => elem.name === i.name)
                if (!languageExist) {
                    unikLanguages.push(i)
                }
            }
            this.languages = unikLanguages
        },

        async getAllCountries () {
            for (const country in this.allCountries) {
                this.countries.push(this.allCountries[country].name)
            }
            this.countries = this.countries.filter(item => item !== '')
        },

        async getAllCallingCodes () {
            for (const codes in this.allCountries) {
                this.callingCodes.push(this.allCountries[codes].callingCodes[0])
            }
            this.callingCodes = this.callingCodes.filter(item => item !== '')
            const unikCallingCodes = new Set()

            this.callingCodes.forEach((item) => {
                unikCallingCodes.add(item)
            })
            this.callingCodes = [...unikCallingCodes.values()]
        }
    }
}
</script>