<template>
    <div>
        <v-combobox
            v-model="selectedFilterType"
            :items="filterTypes"
            label="Filtrar por"
        ></v-combobox>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            selectedFilterType: { text: 'País', value: 'name' },
            filterTypes: [
                { text: 'Região', value: 'region' },
                { text: 'Capital', value: 'capital' },
                { text: 'Língua', value: 'lang' },
                { text: 'País', value: 'name' },
                { text: 'Código de ligação', value: 'callingcode' }
            ],
        }
    },

    computed: {
        ...mapGetters(['getTypeOfFilter'])
    },

    watch: {
        selectedFilterType () {
            this.changeType()
        }
    },

    methods: {
        ...mapActions(['CHANGE_TYPE_OF_FILTER']),

        changeType () {
            let typeOfFilter = [
                { text: '' },
                { value: ''}
            ]

            for (const valueType in this.filterTypes) {
                if (this.selectedFilterType.value === this.filterTypes[valueType].value) {

                    typeOfFilter.text = this.filterTypes[valueType].text
                    typeOfFilter.value = this.filterTypes[valueType].value
                }
            }

            this.CHANGE_TYPE_OF_FILTER({ typeText: typeOfFilter.text, typeValue: typeOfFilter.value })
        }
    }
}
</script>