<template>
    <div class="container-historico">
    <div class="hist-item hist-item-title"><p>PANEL DE INFORMACIÓN</p></div>
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
    methods: {},
    components: { GridHallazgo }
};
</script>

<style lang="scss" scoped></style>