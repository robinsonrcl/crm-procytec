<template>
    <div className="container-historico">
    
    <div className="hist-item hist-item-title"><p>HISTORIA / PATOLOGIA</p>
        <div className="modalIconCerrarHistorico" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
    </div>
    
    <div v-for="hallazgo in hallazgos" :key="hallazgo.id">
        <GridHallazgo v-bind:hallazgo="hallazgo" />    
    </div>
  </div>
</template>

<script lang="ts">
import GridHallazgo from "./GridHallazgo.vue"

export default {
    name: "ModalHistorico",
    created() { },
    data() {
        return {};
    },
    props: {
        hallazgos: { type: Array }
    },
    methods: {
        cerrarModal() {
            this.$emit("showModal", false)
        }
    },
    components: { GridHallazgo }
};
</script>

<style lang="scss" scoped></style>