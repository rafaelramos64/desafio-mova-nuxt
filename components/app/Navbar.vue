<template>
    <v-app-bar
        color="white accent-4"
        dark
        height="100"
        max-height="100"
        class="pl-7 pr-8"
    >
        <v-toolbar-title >
            <v-img src="/images/logo.png" alt="logo" />
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <div>
            <v-img v-if="$vuetify.breakpoint.xs" max-width="19" src="/images/back-small.png" alt="Voltar" />
            <v-img v-else max-width="134" src="/images/back-big.png" alt="Voltar" />
        </div>
    </v-app-bar>
</template>

<style scoped>

</style>
