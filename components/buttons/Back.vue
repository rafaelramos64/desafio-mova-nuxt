<template>
    <div>
        <v-img
            v-if="$vuetify.breakpoint.xs"
            class="back-mobile"
            max-width="25"
            src="/images/back-small.png"
            alt="Voltar" />

        <v-btn
            v-else
            class="back"
            width="134"
            height="36"
            tile
            elevation="0"
            @click.prevent.stop=""
        >
            <v-img class="mr-3" max-width="24" src="/images/back-small.png" alt="Voltar" />
            Voltar
        </v-btn>
    </div>
</template>

<style scoped>
.back {
    text-transform: none;
    font-size: 18px;
    color: #6D2080;
    background-color: transparent !important;
    border: 1px solid #6D2080 !important;
}

.back-mobile {
    cursor: pointer;
}
</style>