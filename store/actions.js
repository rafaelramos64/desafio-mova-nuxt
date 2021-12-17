export default {
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

        const params = [...payload]

        const { data } = await this.$axios.get(`/alpha?codes=${params}`)

        context.commit('add_borders', data)
    },

    CHANGE_SELECTED_REGION_SEARCH (context, payload) {
        context.commit('change_selected_region_search', payload)
    },
}