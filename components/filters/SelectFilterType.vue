<template>
    <div>
        <v-combobox
            v-model="selectedFilterType"
            :items="filterTypes"
            :label="wasClicked ? 'Filtrar por' : 'Escolha uma opção'"
            @click="verifyClickEvent()"
        ></v-combobox>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            selectedFilterType: null,
            filterTypes: [
                { text: 'Região', value: 'region' },
                { text: 'Capital', value: 'capital' },
                { text: 'Língua', value: 'language' },
                { text: 'País', value: 'country' },
                { text: 'Código de ligação', value: 'callingcode' }
            ],
            wasClicked: false
        }
    },

    mounted () {
        setTimeout(() => {
            this.getTypeOfFilter === 'region' ?
                this.selectedFilterType = this.filterTypes[0].value :
                this.selectedFilterType = null
        }, 500)
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

        verifyClickEvent () {
            this.wasClicked = true
        },

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