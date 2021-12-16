<template>
    <div>
        <v-combobox
            v-model="selectedFilteredType"
            :label="`Escolha um(a) ${getTypeOfFilter.text}`"
            :items="filteredTypesList"
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
            filteredTypesList: []
        }
    },

    mounted () {
        if (this.getSelectedRegionSearch) {
            this.selectedFilteredType = this.getFilteredType
        }
            /* this.getCountries() */
            this.CHANGE_SELECTED_REGION_SEARCH(false)
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

        selectedFilteredType () {
            this.changeTypeFiltered()
        },
    },

    methods: {
        ...mapActions(['CHANGE_FILTERED_TYPE', 'CHANGE_TYPE_OF_FILTER', 'CHANGE_SELECTED_REGION_SEARCH']),

        async getCountries () { 
            const { data } = await this.$axios.get('/all')
            this.allCountries = data

            this.getTypeOfFilter.value === 'name' ? this.getAllCountries() : ''
        },

        changeTypeFiltered () {
            if (this.getTypeOfFilter.value === 'region') {
                this.CHANGE_FILTERED_TYPE(this.selectedFilteredType.value)
            }

            else if (this.getTypeOfFilter.value === 'lang') {
                if (this.selectedFilteredType?.value) {
                    this.CHANGE_TYPE_OF_FILTER({ text: this.getTypeOfFilter.text,
                        value: this.getTypeOfFilter.value })

                    this.CHANGE_FILTERED_TYPE(this.selectedFilteredType)
                }

            } else {
                this.CHANGE_FILTERED_TYPE(this.selectedFilteredType)
            }
        },

        getFilters () {
            this.selectedFilteredType = ''

            if (this.getTypeOfFilter.value === 'region') {
                this.filteredTypesList = this.regions
            } else if (this.getTypeOfFilter.value === 'capital') {
                this.getAllCapitals()
            } else if (this.getTypeOfFilter.value === 'lang') {
                this.getAllLanguages()
            } else if (this.getTypeOfFilter.value === 'name') {
                this.getAllCountries()
            } else if (this.getTypeOfFilter.value === 'callingcode') {
                this.getAllCallingCodes()
            }
        },

        getAllCapitals () {
            const allCapitals = []

            for (const i in this.allCountries) {
                allCapitals.push(this.allCountries[i].capital)
            }
            this.filteredTypesList = allCapitals.filter(
                item => item !== '' && item !== null && item !== undefined
            )
        },

        getAllLanguages () {
            let allLanguages = []

            for (const country of this.allCountries) {
                allLanguages.push(country.languages)
            }

            allLanguages = allLanguages.flat(Infinity)
            
            let languagesWithInitials = []

            for (const lang of allLanguages) {
                languagesWithInitials.push([{text: lang.name, value: lang.iso639_1}])
            }
            languagesWithInitials = languagesWithInitials.flat(Infinity)

            const uniklanguagesWithInitials = [...new Set(languagesWithInitials)]

            this.filteredTypesList = [...uniklanguagesWithInitials]
        },

        getAllCountries () {
            const countries = []

            for (const country in this.allCountries) {
                countries.push(this.allCountries[country].name)
            }
            this.filteredTypesList = countries.filter(item => item !== '')
        },

        getAllCallingCodes () {
            let callingCodes = []

            for (const codes in this.allCountries) {
                callingCodes.push(this.allCountries[codes].callingCodes[0])
            }

            callingCodes = callingCodes.filter(item => item !== '')
            const unikCallingCodes = new Set()

            callingCodes.forEach((item) => {
                unikCallingCodes.add(item)
            })

            this.filteredTypesList = [...unikCallingCodes.values()]
        }
    }
}
</script>

<style scoped>

</style>