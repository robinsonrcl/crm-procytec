<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
import { useContratoStore } from "../stores/ContratoStore";
import { ref, onMounted  } from "vue";
import { setupContainsLatLng } from "../utils/is-point-within-polygon.js"
import ImportarJson from "./ImportarJson.vue";

    const contratoStore = useContratoStore()
    const myMapRef = ref();
    const mapPolygon = ref();

    onMounted(() => {
      myMapRef.value.$mapPromise.then(() => {
        setupContainsLatLng();
      })
    })

</script>

<template>
  <GMapMap
    ref="myMapRef"
    :click="true"
    @click="handleEventClick"
    :center="contratoStore.getPuntomedio"
    :zoom="15"
    map-type-id="satellite"
    style="width: 100%; height: 100%;"
    >

    <GMapPolygon
      :options="{
          clickable: false
        }"
      :clickable="false"
      ref="mapPolygon"
      :paths="paths"
    />

    <div v-for="item in contratoStore.getPath" :key="item.id">
      <GMapPolyline 
      :path=item.corriente
      :editable="true"
      :options="optionspoly"
      ref="polyline" />

      <GMapMarker
        :key="index"
        :position=item.puntomedio
        :icon="{ 
            url: require('../assets/images/marcadores/puntomedio.svg'),
            labelOrigin: {x: 16, y: -10},
            scaledSize: { width: 42, height: 42 }
        }"
        :clickable="true"
        :draggable="false">

      </GMapMarker>
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
            url: require(`../assets/images/marcadores/${hallazgo.icono}`),
            scaledSize: { width: 32, height: 32 } }"
        :clickable="true"
        :draggable="false"
        @click="openMarker(hallazgo.id)"
        >
        
        <GMapPolyline 
          :path=hallazgo.coordenadas
          :editable="true"
          :options="optionspoly"
        />

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
          }">

          <BubbleInfo
            @show-modal-historia="showHistoria" 
            @show-modal="enviarShow" 
            v-bind:hallazgo="hallazgo"
          />

        </GMapInfoWindow>
      </GMapMarker>

      <div v-for="circle in circles" :key="circle">
        <GMapCircle
          :radius="200"
          :center="circle.position"
          :options="circleOptions"
        />
      </div>
    <!-- </GMapCluster> -->
    
  <ImportarJson />
  </GMapMap>
</template>

<script>
import BubbleInfo from "../components/BubbleInfo.vue";
import { mapActions, mapState } from "pinia";

export default {
  name: "MapaGeneral",

  components: {
    BubbleInfo
  },

  computed: {
    ...mapState(useContratoStore, ["getPatologia"])
  },

  data() {
    return {
      circles: [],
      circleOptions: {
        strokeColor: "#7768D3",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#9B91D8",
        fillOpacity: 0.35,
      },
      paths: [
        {lat: 25.774, lng: -80.19},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
      ],
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
    ...mapActions(useContratoStore, [
        "loadPatologia"
        ]),
    enviarShow(show, fotos) {
      this.$emit('showModal', show, fotos)
    },
    showHistoria(show, position) {
      this.loadPatologia(position)
      this.$emit('showModalHistoria', show, this.getPatologia)
      show ? this.createCircleHallazgo(position) : this.circles = []
    },
    createCircleHallazgo(position) {
      position === undefined ? position = {"lat": 0.0, "lng": 0.0 } :
    
      this.circles = [
        { position: position }
      ]
    },
    openMarker(id) {
        this.openedMarkerID = id
    },
    openInfoWindowTemplate(pos) {
      this.infoWindow.position = pos;
      this.infoWindow.open = true;

      this.clicked = true;
    },

  }

}
</script>

