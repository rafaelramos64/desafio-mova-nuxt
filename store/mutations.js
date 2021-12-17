export default {
    change_type_of_filter (state, payload) {
        state.typeOfFilter.text = payload.text
        state.typeOfFilter.value = payload.value
    },

    add_all_flags (state, payload) {
        state.allFlags = payload
    },

    changing_filtered_type (state, payload) {
        state.filteredType = payload
    },

    change_loader (state) {
        state.load += 1
    },

    add_borders(state, payload) {
        state.borders = payload
    },

    change_selected_region_search (state, payload) {
        state.selectedRegionSearch = payload
    },
}