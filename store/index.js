export const state = () => ({
    typeOfFilter: {
        typeText: 'País',
        typeValue: 'country'
    },
    filteredType: null,
    allFlags: [],
    load: 1,
    borders: [],
    selectedRegionSearch: null,
    /* itemsToShow: [] */
})

export const getters = {
    getTypeOfFilter (state) {
        return state.typeOfFilter
    },

    getFilteredType (state) {
        return state.filteredType
    },

    getAllFlags (state) {
        return state.allFlags
    },

    getLoad (state) {
        return state.load
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

export const mutations = {
    change_type_of_filter (state, payload) {
        state.typeOfFilter.typeText = payload.typeText
        state.typeOfFilter.typeValue = payload.typeValue
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

    /* change_pagination (state, payload) {
        state.itemsToShow = payload
    } */
}

export const actions = {
    CHANGE_TYPE_OF_FILTER (context, payload) {
        context.commit('change_type_of_filter', payload)
    },

    async ADD_ALL_FLAGS (context, payload) {
        const params = payload ? `/${payload.type}/${payload.filtered}` : '/all'
        const filteredFlags = []
        
        try {
        const { data } = await this.$axios.get(params)

        for (const i in data) {
            filteredFlags.push(data[i])
        }

        context.commit('add_all_flags', filteredFlags)
        } catch (err) {
        console.error(err)
        }
    },

    CHANGE_FILTERED_TYPE (context, payload) {
        context.commit('changing_filtered_type', payload)
    },

    CHANGE_LOADER (context) {
        context.commit('change_loader')
    },

    async ADD_BORDERS (context, payload) {
        const border = []
        const alpha = 'alpha'

        for (const i in payload) {
        const { data } = await this.$axios.get(`/${alpha}/${payload[i]}`)
        border.push(data)
        }
        context.commit('add_borders', border)
    },

    CHANGE_SELECTED_REGION_SEARCH (context, payload) {
        context.commit('change_selected_region_search', payload)
    },

    /* CHANGE_PAGINATION (context, payload) {
        context.commit('change_pagination', payload)
    }, */
}

export const modules = {}
