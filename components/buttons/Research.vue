<template>
    <div>
        <v-btn
            class="btn"
            :disabled="!filteredType || !typeOfFilter"
            @click.prevent.stop="searchFlagsByType()"
        >
            PESQUISAR
        </v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

    computed: {
        ...mapGetters(['typeOfFilter', 'filteredType'])
    },

    methods: {
        ...mapActions(['CHANGE_LOADER', 'ADD_ALL_FLAGS']),

        async searchFlagsByType () {
            this.ADD_ALL_FLAGS({ type: this.typeOfFilter.typeValue, filtered: this.filteredType })
            this.CHANGE_LOADER()
        }
    }
}

</script>

<style scoped>

.btn {
    background-color: #6D2080;
    color: #fff;
    border-radius: 10px;
    min-width: 156px;
    min-height: 36px;
    font-size: 17px;
}

.btn:hover, .btn:focus {
    cursor: pointer !important;
    color: #fff;
    background-color: #6D2080;
}

.btn-secondary:focus, .btn-secondary.focus {
    box-shadow: none !important;
}

</style>
