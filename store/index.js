import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const state = () => ({
    typeOfFilter: {
        text: 'País',
        value: 'name'
    },
    filteredType: null,
    allFlags: [],
    borders: [],
    selectedRegionSearch: null,
})

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}