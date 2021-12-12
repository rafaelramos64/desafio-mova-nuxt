<template>
    <div>
        <v-combobox
            v-model="selectedFilteredType"
            :label="`Escolha um(a) ${getTypeOfFilter.typeText}`"
            :items="capitals"
        ></v-combobox>
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

    mounted () {
        this.getCountries()
        /* this.changeTypeFiltered() */
    },

    computed: {
        ...mapGetters(['getTypeOfFilter', 'getFilteredType', 'getSelectedRegionSearch']),
    },

    watch: {
        getTypeOfFilter: {
            deep: true,
            handler () {
                this.getFilters()
            },
        },

        getFilteredType () {
            this.changeTypeFiltered()
        },
    },

    methods: {
        ...mapActions(['CHANGE_FILTERED_TYPE', 'CHANGE_TYPE_OF_FILTER', 'CHANGE_SELECTED_REGION_SEARCH']),

        async getCountries () { 
            const { data } = await this.$axios.get('/all')
            this.allCountries = data
        },

        changeTypeFiltered () {
            if (this.getSelectedRegionSearch) {
                this.selectedFilteredType = this.getFilteredType
                this.CHANGE_SELECTED_REGION_SEARCH(false)
            }
            if (this.getTypeOfFilter.typeValue === 'language') {
                this.CHANGE_TYPE_OF_FILTER({ typeText: this.getTypeOfFilter.typeText, typeValue: 'lang' })
            } else if (this.getTypeOfFilter.typeValue === 'country') {
                this.CHANGE_TYPE_OF_FILTER({ typeValue: 'name', typeText: this.getTypeOfFilter.typeText })
            }

            this.CHANGE_FILTERED_TYPE(this.selectedFilteredType)
        },

        getFilters () {
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

        getAllCapitals () {
            const allCapitals = []

            for (const i in this.allCountries) {
                allCapitals.push(this.allCountries[i].capital)
            }
            this.capitals = allCapitals.filter(item => item !== '' && item !== null && item !== undefined)
        },

        getAllLanguages () {
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

        getAllCountries () {
            for (const country in this.allCountries) {
                this.countries.push(this.allCountries[country].name)
            }
            this.countries = this.countries.filter(item => item !== '')
        },

        agetAllCallingCodes () {
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

<style scoped>

</style>