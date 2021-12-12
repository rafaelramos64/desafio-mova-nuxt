<template>
    <v-container>
        <span class="neighbors-countries" style="color: #000">Países Vizinhos: </span><br><br><br>
        <Loader v-show="this.loading"> </Loader>

        <v-row v-show="!this.loading">
            <v-col
                sm="12" xs="12" lg="4" md="4"
                class="p-0"
                v-for="(neighbor, index) in listItems" :key="index"
            >
                <a @click="reloadCurrentPage(neighbor.alpha2Code)" >
                    <v-img class="country-img mb-3 ml-0 mr-0" :src="neighbor.flag" :alt="neighbor.name" />
                </a>
            </v-col>
        </v-row>

        <v-row v-show="this.borders.length > 2" class="mt-3">
            <v-col>
                <div class="pagination">
                    <div
                        v-show="!disablePrevButton"
                        @click="prevPage()"
                        class="back-page cursor"
                    >
                        ❮ &nbsp; 
                    </div>
                    <div
                        v-for="page in allowList"
                        :key="page"
                    >
                        <div
                            class="page cursor"
                            :class="currentPage === page ? 'active' : ''"
                            @click="currentPage = page"
                        >
                            {{ page }}
                        </div>
                    </div>
                    <div
                        v-show="!disableNextButton"
                        @click="nextPage()"
                        class="next-page cursor"
                    >
                        &nbsp; ❯
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row v-show="!this.borders[0]">
            <v-col>
                <span class="neighbors-countries text-center">Nenhum país encontrado </span><br><br><br>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loader from '@/components/Loader'

export default {
    name: 'NeighborsCountries',
    components: { Loader },
    data () {
        return {
            loading: null,
            currentPage: 1,
            itemsPerPage: 3,
            disablePrevButton: false,
            disableNextButton: false
        }
    },

    computed: {
        ...mapState(['borders', 'allFlags']),

        allowList () {
            const { totalPages } = this
            const currentPage = this.currentPage
            const allowList = []
            if (currentPage - 4 > 0 && currentPage >= totalPages) {
                allowList.push(currentPage - 4)
                allowList.push(currentPage - 3)
                allowList.push(currentPage - 2)
                allowList.push(currentPage - 1)
            } else if (currentPage - 3 > 0 && currentPage + 1 >= totalPages) {
                allowList.push(currentPage - 3)
                allowList.push(currentPage - 2)
                allowList.push(currentPage - 1)
            } else if (currentPage - 2 > 0) {
                allowList.push(currentPage - 2)
                allowList.push(currentPage - 1)
            } else if (currentPage - 1 > 0) {
                allowList.push(currentPage - 1)
            }

            allowList.push(currentPage)

            if (currentPage + 4 <= totalPages && currentPage < 2) {
                allowList.push(currentPage + 1)
                allowList.push(currentPage + 2)
                allowList.push(currentPage + 3)
                allowList.push(currentPage + 4)
            } else if (currentPage + 3 <= totalPages && currentPage < 3) {
                allowList.push(currentPage + 1)
                allowList.push(currentPage + 2)
                allowList.push(currentPage + 3)
            } else if (currentPage + 2 <= totalPages) {
                allowList.push(currentPage + 1)
                allowList.push(currentPage + 2)
            } else if (currentPage + 1 <= totalPages) {
                allowList.push(currentPage + 1)
            }

            return allowList
        },

        listItems () {
            const { borders, currentPage, itemsPerPage } = this

            const result = []
            const totalPage = Math.ceil(borders.length / itemsPerPage)
            let count = (currentPage * itemsPerPage) - itemsPerPage
            const delimiter = count + itemsPerPage

            if (currentPage <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (borders[i]) {
                        result.push(borders[i])
                    }
                count++
                }
            }
            return result
        },

        totalPages () {
            const allBorders = []
            for (const i in this.borders) {
                allBorders.push(this.borders[i].flag)
            }
            const total = allBorders.length / this.itemsPerPage
            return total !== Infinity ? Math.ceil(total) : 0
        }
    },

    watch: {
        allFlags () {
            this.currentPage = 1
            this.loading = true

        setTimeout(() => {
            this.flagData = this.allFlags
            this.loading = false
        }, 800)
        },

        currentPage () {
        if (this.currentPage === 1) {
            this.disablePrevButton = true
        } else {
            this.disablePrevButton = false
        }

        if (this.currentPage === this.totalPages) {
            this.disableNextButton = true
        } else {
            this.disableNextButton = false
        }
        }
    },

    methods: {
        ...mapActions(['GET_FLAGS']),

        reloadCurrentPage (neighborCode) {
        setTimeout(() => {
            this.GET_FLAGS({ type: 'alpha', filtered: neighborCode })
        }, 100)

            this.$router.push({ name: 'Country', params: { alpha: neighborCode } })
        },

        prevPage () {
            this.disableNextButton = false
            this.currentPage -= 1
        },

        nextPage () {
            this.disablePrevButton = false
            this.currentPage += 1
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
