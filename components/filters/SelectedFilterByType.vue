<template>
    <div>
        <v-form-group
            :label="textTypeFiltered"
            label-for="filterByType">
            <v-form-select
                id="filterByType"
                @change="changeTypeFiltered()"
                v-model="selectFilteredType"
                >
                <template #first>
                    <v-form-select-option selected :value="null" disabled>
                        Escolha uma {{ textTypeFiltered }}
                    </v-form-select-option>
                </template>

                <template v-if="this.typeOfFilter === 'region'">
                    <v-form-select-option
                        v-for="(region, index) in regions" :key="index" :value="region.value"
                        >
                        {{ region.text }}
                    </v-form-select-option>
                </template>

                <template v-if="this.typeOfFilter === 'capital'">
                    <v-form-select-option
                        v-for="(capital, index) in capitals" :key="index" :value="capital"
                        >
                        {{ capital }}
                    </v-form-select-option>
                </template>

                <template v-if="this.typeOfFilter === 'language' || this.typeOfFilter === 'lang'">
                    <v-form-select-option
                        v-for="(lang, index) in languages" :key="index" :value="lang.iso639_1"
                        >
                        {{ lang.name }}
                    </v-form-select-option>
                </template>

                <template v-if="this.typeOfFilter === 'country' || this.typeOfFilter === 'name'"
                >
                    <v-form-select-option
                        v-for="(country, index) in countries" :key="index" :value="country"
                    >
                        {{ country }}
                    </v-form-select-option>
                </template>

                <template v-if="this.typeOfFilter === 'callingcode'">
                    <v-form-select-option
                        v-for="(code, index) in callingCodes" :key="index" :value="code"
                    >
                        {{ code }}
                    </v-form-select-option>
                </template>
            </v-form-select>
        </v-form-group>
    </div>
</template>