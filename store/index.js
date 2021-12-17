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

export const actions = {
    CHANGE_TYPE_OF_FILTER (context, payload) {
        context.commit('change_type_of_filter', payload)
    },

    CHANGE_FILTERED_TYPE (context, payload) {
        if (payload?.value) {
            context.commit('changing_filtered_type', payload.value)
        } else {
            context.commit('changing_filtered_type', payload)
        }
    },

    async ADD_ALL_FLAGS (context, payload) {
        const params = payload ? `/${payload.type}/${payload.filtered}` : '/all'
        let filteredFlags = []
        try {
            if (payload?.type === 'alpha') {   
                const { data } = await this.$axios.get(params)
    
                filteredFlags = data
            } else {
                const { data } = await this.$axios.get(params)
    
                for (const i in data) {
                    filteredFlags.push(data[i])
                }
            }
    
            context.commit('add_all_flags', filteredFlags)
        } catch (erro) {
            console.error(erro)
        }
    },

    async ADD_BORDERS (context, payload) {
        const borders = []
        
        for (const i in payload) {
            borders.push(payload[i])
        }

        const params = [...borders]

        const { data } = await this.$axios.get(`/alpha?codes=${params}`)

        context.commit('add_borders', data)
    },

    CHANGE_SELECTED_REGION_SEARCH (context, payload) {
        context.commit('change_selected_region_search', payload)
    },
}

export const modules = {}
