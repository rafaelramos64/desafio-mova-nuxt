<template>
    <v-app-bar
        color="white accent-4"
        dark
        height="100"
        max-height="100"
        class="pl-7 pr-8"
    >
        <v-toolbar-title >
            <NuxtLink to="/">
                <v-img src="/images/logo.png" alt="logo" />
            </NuxtLink>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        
        <Back />
    </v-app-bar>
</template>

<style scoped>

</style>
