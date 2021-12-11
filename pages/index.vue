<template>
    <v-container>
        <v-row align-h="between" class="mb-3 mt-5">
            <v-col cols="12" md="3" class="first-filter ml-5 mr-auto p-0">
                <SelectFilterType />
            </v-col>

            <v-col v-show="getTypeOfFilter.typeValue !== ''" cols="12" md="3">
                <SelectByFilterType />
            </v-col>

            <v-col cols="12" md="3" class=" search-button ml-auto mt-2">
                <Research/>
            </v-col>
            </v-row>

            <v-row align-h="center" class="mb-3">
            <v-col cols="12">
                <!-- <Flags /> -->
            </v-col>
        </v-row> 
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    data () {
        return {
        }
    },

    computed: {
        ...mapGetters(['getTypeOfFilter', 'getAllFlags'])
    }
}
</script>

<style scoped>

.home {
    padding: 100px;
}

@media screen and (max-width: 550px) {
    .home {
        padding: 0px 15px 0px 15px !important;
    }

    .row {
        justify-content: center !important;
    }

    .first-filter {
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-bottom: 5px !important;
        padding: 0px 15px 0px 15px !important;
    }

    .search-button {
        text-align: right !important;
    }
}

</style>
