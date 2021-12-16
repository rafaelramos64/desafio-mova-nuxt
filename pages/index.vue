<template>
    <div>
        <v-container>
            <v-row
                align="center"
                :justify="$vuetify.breakpoint.smAndDown ? 'center' : 'space-around'"
                class="mb-3 mt-5 mx-auto">
                <v-col class="d-flex justify-center" cols="12" sm="5" md="4">
                    <SelectFilterType />
                </v-col>

                <v-col v-show="getTypeOfFilter.value !== ''" class="d-flex justify-center" cols="12" sm="5" md="4">
                    <SelectByFilterType />
                </v-col>

                <v-col class="d-flex justify-center" cols="5" sm="4">
                    <Research/>
                </v-col>
            </v-row>
        </v-container>

        <Flags />
    </div>
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
}

</style>
