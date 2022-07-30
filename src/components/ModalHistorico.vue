<template>
    <div class="container-historico">
    
    <div class="hist-item hist-item-title"><p>HISTORIA / PATOLOGIA</p>
        <div class="modalIconCerrarHistorico" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
    </div>
    <div v-for="item in 6" :key="item.id">
        <GridHallazgo />    
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
    props: {},
    methods: {
        cerrarModal() {
            this.$emit("showModal", false)
        }
    },
    components: { GridHallazgo }
};
</script>

<style lang="scss" scoped></style>