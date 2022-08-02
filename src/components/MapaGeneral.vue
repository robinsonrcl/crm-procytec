<script setup>
import { useContratoStore } from "@/stores/ContratoStore";

const contratoStore = useContratoStore()

</script>
<template>
  <GMapMap
    :center=contratoStore.getPuntomedio
    :zoom="15"
    :disableDefaultUI="true"
    :options="options"
    :click="true"
    @click="handleClick"
    ref="myMapRef"
    map-type-id="roadmap"
    style="width: 100%; height: 100%;"
  >

  <div v-for="item in contratoStore.getPath" :key="item.id">
      <GMapPolyline 
      :path=item
      :editable="true"
      :options="optionspoly"
      ref="polyline" />
  </div>

    <!-- <GMapCluster
        :minimumClusterSize="3"
        :styles="clusterIcon"
        :zoomOnClick="true"
        
    > -->
      <GMapMarker
        :key="index"
        v-for="(hallazgo, index) in contratoStore.getHallazgos"
        :position="hallazgo.position"
        :icon="{ 
            url: require('@/assets/images/gif/cuadradoAlert.gif'),
            scaledSize: { width: 32, height: 32 } }"
        :clickable="true"
        :draggable="false"
        :markerlabel="{ text: 'Hola Mundo' }"
        @click="openMarker(hallazgo.id)"
        >

      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID == hallazgo.id"
        :options=" {
              pixelOffset: {
                width: 10, height: 0
              },
              maxWidth: 400,
              maxHeight: 320,
       }"
        >
        <BubbleInfo
          @show-modal-historia="showHistoria" 
          @show-modal="enviarShow" 
          v-bind:hallazgo="hallazgo"
        />

      </GMapInfoWindow>
      
    </GMapMarker>
    <!-- </GMapCluster> -->
  </GMapMap>
</template>

<script>
import BubbleInfo from "@/components/BubbleInfo.vue";
import { ref, watch } from "vue";

export default {
  name: "MapaGeneral",

  components: {
    BubbleInfo
  },

  setup() {
    const myMapRef = ref();

    watch(myMapRef, (googleMap) => {
      if (googleMap) {

        // googleMap.$mapPromise.then(map => {
        //   addLinea(map)
        // })

        // googleMap.$mapPromise.then((map) => {
        //   addMyButton(map);
        // });
      }
    });

    return {
      myMapRef,
    };
  },

  data() {
    return {
        openedMarkerID: null,
        infoWindow: {
            position: { lat: 6.248353, lng: -75.580265 },
            open: false,
            template: "",
        },
        clicked: false,
        center: [],
        options: {
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
        },
        optionspoly: {
          strokeColor: "#0000FF",
          strokeWeight: 1
        }
    };
  },

  methods: {
    enviarShow() {
      this.$emit('showModal', true)
    },
    showHistoria() {
      this.$emit('showModalHistoria', true)
    },
    openMarker(id) {
        this.openedMarkerID = id
    },
    openInfoWindowTemplate(pos) {
      this.infoWindow.position = pos;
      this.infoWindow.open = true;

      this.clicked = true;
    }
  },
};

</script>
