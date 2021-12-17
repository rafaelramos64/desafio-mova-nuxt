export default {
    getTypeOfFilter (state) {
        return state.typeOfFilter
    },

    getFilteredType (state) {
        return state.filteredType
    },

    getAllFlags (state) {
        return state.allFlags
    },

    getBorders (state) {
        return state.borders
    },

    getSelectedRegionSearch (state) {
        return state.selectedRegionSearch
    },

    getItemsToShow (state) {
        return state.itemsToShow
    }
}