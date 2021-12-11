<template>
    <div>
        <v-form-group
            label="Filtrar por"
            label-for="select">
            <v-form-select
                @change="changeType() "
                id="select"
                v-model="selectedFilter"
                :options="filterTypes"
            >
                <template #first>
                    <v-form-select-option
                        :value="null"
                        disabled
                    >
                        Escolha uma opção   
                    </v-form-select-option>
                </template>
            </v-form-select>
        </v-form-group>
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
        async changeType () {
            let typeFiltered = ''
            let textTypeFiltered = ''

            for (const valueType in this.filterTypes) {
                if (this.selectedFilter === this.filterTypes[valueType].value) {
                    typeFiltered = this.filterTypes[valueType].value
                    textTypeFiltered = this.filterTypes[valueType].text
                }
            }

            this.$store.commit('CHANGE_TYPE_OF_FILTER', { type: typeFiltered, textType: textTypeFiltered })
        }
    }
}
</script>