<template>
    <v-container>
        <Loader v-show="this.loading"> </Loader>
        <v-row
            v-show="!this.loading"
            align-h="center"
            class="text-center"
            >
            <v-col
                sm="12"
                md="4"
                v-for="flag in listItems"
                :key="flag.alpha2Code"
                class="m-auto p-0"
            >
                <a @click="sendCountryToViewIt(flag.alpha2Code)">
                    <v-img
                        class="country-img mb-3"
                        :src="flag.flag"
                        :lazy-src="flag.flag"
                        :alt="flag.name"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </a>
            </v-col>
        </v-row>
        <v-row v-show="listItems.length > 2" class="mt-3">
            <v-col>
                <div class="pagination d-flex justify-center">
                    <div
                        v-show="!disablePrevButton"
                        @click="prevPage()"
                        class="back-page cursor"
                    >   ❮ &nbsp;
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
                    >   &nbsp; ❯
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            loading: true,
            currentPage: 1,
            itemsPerPage: 9,
            disablePrevButton: false,
            disableNextButton: false
        }
    },

    mounted () {
        setTimeout(() => {
            if (this.getFilteredType !== null && this.getTypeOfFilter !== null) {
                this.ADD_ALL_FLAGS({ type: this.getTypeOfFilter, filtered: this.getFilteredType })
            } else {
                this.ADD_ALL_FLAGS()
            }
        }, 500)
        setTimeout(() => {
            this.loading = false
        }, 1000)
    },

    computed: {
        ...mapGetters(['getAllFlags', 'getLoad', 'getTypeOfFilter', 'getFilteredType', 'getItemsToShow']),

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
            const { getAllFlags, currentPage, itemsPerPage } = this

            const result = []
            const totalPage = Math.ceil(getAllFlags.length / itemsPerPage)
            let count = (currentPage * itemsPerPage) - itemsPerPage
            const delimiter = count + itemsPerPage

            if (currentPage <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (getAllFlags[i]) {
                        result.push(getAllFlags[i])
                    }
                    count++
                }
            }
            return result
        },

        totalPages () {
            const allFlags = []
            for (const i in this.getAllFlags) {
                allFlags.push(this.getAllFlags[i].flag)
            }

            const total = allFlags.length / this.itemsPerPage
            return total !== Infinity ? Math.ceil(total) : 0
        }
    },

    watch: {
        load () {
            this.changeLoadingStatus()
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
        },

        getAllFlags () {
            this.currentPage = 1
        }
    },

    methods: {
        ...mapActions(['ADD_ALL_FLAGS']),

        async changeLoadingStatus () {
            this.loading = true
            setTimeout(() => {
                this.loading = true
            }, 500)

            setTimeout(() => {
                this.loading = false
            }, 900)
        },

        prevPage () {
            this.disableNextButton = false
            this.currentPage -= 1
        },

        nextPage () {
            this.disablePrevButton = false
            this.currentPage += 1
        },

        async sendCountryToViewIt (alphaCode) {
            setTimeout(() => {
                this.ADD_ALL_FLAGS({ type: 'alpha', filtered: alphaCode })
            }, 1000)
            
            this.$router.push({ name: 'Country', params: { alpha: alphaCode } })
        }
    }
}
</script>

<style scoped>
.cursor {
    cursor: pointer;
}
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

@media screen and (max-width: 550px) {
    .country-img, .flag {
        width: 100% !important;
    }
}

.country-img {
    width: 316px;
    height: 181px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    padding: 0;
    object-fit: contain;
}
</style>