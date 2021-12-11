<template>
    <div>
        <v-combobox
            v-model="selectedFilter"
            :items="filterTypes"
            label="Escolha uma opção"
        ></v-combobox>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            selectedFilter: null,
            filterTypes: [
                { text: 'Região', value: 'region' },
                { text: 'Capital', value: 'capital' },
                { text: 'Língua', value: 'language' },
                { text: 'País', value: 'country' },
                { text: 'Código de ligação', value: 'callingcode' }
            ]
        }
    },

    mounted () {
        setTimeout(() => {
            this.typeOfFilter === 'region' ?
                this.selectedFilter = this.filterTypes[0].value :
                this.selectedFilter = null
        }, 500)
    },

    computed: {
        ...mapState(['typeOfFilter'])
    },

    watch: {
        selectedFilter () {
            this.changeType()
        }
    },

    methods: {
        changeType () {
            let typeFiltered = ''
            let textTypeFiltered = ''

            for (const valueType in this.filterTypes) {
                if (this.selectedFilter.value === this.filterTypes[valueType].value) {
                    typeFiltered = this.filterTypes[valueType].value
                    textTypeFiltered = this.filterTypes[valueType].text
                    console.log(typeFiltered, textTypeFiltered)
                }
            }

            this.$store.commit('CHANGE_TYPE_OF_FILTER', { type: typeFiltered, textType: textTypeFiltered })
        }
    }
}
</script>