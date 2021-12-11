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
        lg="4"
        md="4"
        v-for="flag in listItems"
        :key="flag.alpha2Code"
        class="m-auto p-0"
      >
        <a @click="sendCountryToViewIt(flag.alpha2Code)">
          <v-img
            class="country-img mb-3"
            :src="flag.flag"
            :alt="flag.name"
          ></v-img>
        </a>
      </v-col>
    </v-row>

    <v-row v-show="listItems.length > 2" class="mt-3">
      <v-col>
        <div class="pagination">
          <div
            v-show="!disablePrevButton"
            @click="prevPage()"
            class="back-page cursor"
          > ❮ &nbsp; </div>
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
            > &nbsp; ❯
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data () {
        return {
            loading: true,
            currentPage: 1,
            itemsPerPage: 12,
            disablePrevButton: false,
            disableNextButton: false
        }
    },

    mounted () {
        setTimeout(() => {
            if (this.$store.state.filteredType !== null && this.$store.state.typeOfFilter !== null) {
            this.GET_FLAGS({ type: this.typeOfFilter, filtered: this.filteredType })
            } else {
            this.GET_FLAGS()
            }
        }, 500)
        setTimeout(() => {
            this.loading = false
        }, 1000)
    },

    computed: {
        ...mapState(['allFlags', 'load', 'typeOfFilter', 'filteredType', 'itemsToShow']),

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
            const { allFlags, currentPage, itemsPerPage } = this

            const result = []
            const totalPage = Math.ceil(allFlags.length / itemsPerPage)
            let count = (currentPage * itemsPerPage) - itemsPerPage
            const delimiter = count + itemsPerPage
            if (currentPage <= totalPage) {
                for (let i = count; i < delimiter; i++) {
                    if (allFlags[i]) {
                    result.push(allFlags[i])
                    }
                    count++
                }
            }
            return result
        },

        totalPages () {
            const allFlags = []
            for (const i in this.allFlags) {
                allFlags.push(this.allFlags[i].flag)
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

        allFlags () {
            this.currentPage = 1
        }
    },

    methods: {
        ...mapActions(['GET_FLAGS']),
        ...mapMutations(['CHANGE_PAGINATION']),

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
                this.GET_FLAGS({ type: 'alpha', filtered: alphaCode })
            }, 1000)
            
            this.$router.push({ name: 'Country', params: { alpha: alphaCode } })
        }
    }
}
</script>
