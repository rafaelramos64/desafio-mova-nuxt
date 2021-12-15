<template>
    <div>
        <v-btn
            class="btn"
            color="primary"
            width="156px"
            height="36px"
            :disabled="!getFilteredType || !getTypeOfFilter"
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
        ...mapGetters(['getTypeOfFilter', 'getFilteredType'])
    },

    methods: {
        ...mapActions(['ADD_ALL_FLAGS']),

        searchFlagsByType () {
            this.ADD_ALL_FLAGS({ type: this.getTypeOfFilter.typeValue, filtered: this.getFilteredType })
        }
    }
}

</script>

<style scoped>

.btn {
    color: #fff;
    border-radius: 10px;
    font-size: 17px;
}

.btn:hover, .btn:focus {
    cursor: pointer !important;
    color: #6D2080;
    background-color: #fff !important;
    border: 1px solid #6D2080;
}

.btn-secondary:focus, .btn-secondary.focus {
    box-shadow: none !important;
}

</style>
