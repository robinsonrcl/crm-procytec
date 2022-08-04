<template>
    <div class="container-historico">
    
    <div class="hist-item hist-item-title"><p>HISTORIA / PATOLOGIA</p>
        <div class="modalIconCerrarHistorico" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
    </div>
    
    <div v-for="hallazgo in hallazgos" :key="hallazgo.id">
        <GridHallazgo v-bind:hallazgo="hallazgo" />    
    </div>
  </div>
</template>

<script>
import GridHallazgo from '@/components//GridHallazgo.vue';

export default {
    name: "ModalHistorico",
    created() { },
    data() {
        return {};
    },
    props: {
        hallazgos: []
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