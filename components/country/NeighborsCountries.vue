<template>
    <v-container>
        <span class="text-title-color">Países Vizinhos: </span><br><br><br>
        <Loader v-show="this.loading" />

        <v-row v-show="!this.loading">

            <v-col
                cols="12" md="4"
                class="p-0"
                v-for="neighbor in toListNeighbors" :key="neighbor.name"
            >
                <div @click="reloadCurrentPage(neighbor.alpha2Code)">
                    <Flag :country="neighbor" />
                </div>
            </v-col>
        </v-row>

        <v-row v-show="this.getBorders.length > 2" class="mt-3">
            <v-col>
                <div class="pagination d-flex justify-center">
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
        <v-row v-if="!this.getBorders.length > 0">
            <v-col class="pl-15">
                <span style="color: #6D2080">Nenhum país encontrado </span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'NeighborsCountries',
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
        ...mapGetters(['getBorders', 'getAllFlags']),

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

        toListNeighbors () {
            const { getBorders, currentPage, itemsPerPage } = this

            const result = []
            const totalPage = Math.ceil(getBorders.length / itemsPerPage)
            let count = (currentPage * itemsPerPage) - itemsPerPage
            const delimiter = count + itemsPerPage

            if (currentPage <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (getBorders[i]) {
                        result.push(getBorders[i])
                    }
                count++
                }
            }
            return result
        },

        totalPages () {
            const allBorders = []
            for (const i in this.getBorders) {
                allBorders.push(this.getBorders[i].flag)
            }
            const total = allBorders.length / this.itemsPerPage
            return total !== Infinity ? Math.ceil(total) : 0
        }
    },

    watch: {
        getAllFlags () {
            this.currentPage = 1
            this.loading = true

        setTimeout(() => {
            this.flagData = this.getAllFlags
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
        ...mapActions(['ADD_ALL_FLAGS']),

        reloadCurrentPage (neighborCode) {
            setTimeout(() => {
                this.ADD_ALL_FLAGS({ type: 'alpha', filtered: neighborCode })
            }, 100)
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

<style  scoped>
.pagination {
    color: #8d8d8d;
}

.page {
    padding: 5px 8px 8px 8px;
    margin-right: 5px;
    text-align: center;
    vertical-align: middle;
    width: 34px;
    height: 34px;
    left: 86px;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
}

div .active {
    background-color: #6D2080 !important;
    color: #fff !important;
}

.back-page {
    margin-top: 3px;
    width: 28px;
    height: 28px;
    margin-right: 5px;
    padding-left: 10px;
    padding-top: 2.5px;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
}

.next-page {
    margin-top: 3px;
    width: 28px;
    height: 28px;
    padding-left: 4px;
    padding-top: 2.5px;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
}

.pagination :hover:not(.active) {
    background-color: #ddd;
}

.text-title-color {
    color: #02AE99;
    font-weight: bold;
}
</style>
