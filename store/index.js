export const state = () => ({
    typeOfFilter: null,
    textTypeFiltered: '',
    filteredType: null,
    allFlags: [],
    load: 1,
    borders: [],
    selectedRegionSearch: null,
    itemsToShow: []
})

export const mutations = {
    CHANGE_TYPE_OF_FILTER (state, payload) {
        state.typeOfFilter = payload.type
        state.textTypeFiltered = payload.textType
    },

    ADD_ALL_FLAGS (state, payload) {
        state.allFlags = payload
    },

    CHANGING_FILTERED_TYPE (state, payload) {
        state.filteredType = payload
    },

    CHANGE_LOADER (state, payload) {
        state.load += 1
    },

    ADD_BORDERS (state, payload) {
        state.borders = payload
    },

    CHANGE_SELECTED_REGION_SEARCH (state, payload) {
        state.selectedRegionSearch = payload
    },

    CHANGE_PAGINATION (state, payload) {
        state.itemsToShow = payload
    }
}

export const actions = {
    async GET_FLAGS (context, payload) {
        const params = payload ? `/${payload.type}/${payload.filtered}` : '/all'
        const filteredFlags = []

        try {
        const { data } = await this.$axios.get(params)

        for (const i in data) {
            filteredFlags.push(data[i])
        }

        context.commit('ADD_ALL_FLAGS', filteredFlags)
        } catch (err) {
        console.error(err)
        }
    },

    async GET_BORDERS (context, payload) {
        const border = []
        const alpha = 'alpha'

        for (const i in payload) {
        const { data } = await this.$axios.get(`/${alpha}/${payload[i]}`)
        border.push(data)
        }
        context.commit('ADD_BORDERS', border)
    }
}

export const modules = {}

export const getters = {}
