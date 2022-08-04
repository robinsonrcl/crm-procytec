<script setup>
  import { useContratoStore } from "@/stores/ContratoStore";
  const contratoStore = useContratoStore()

    const myMapRef = ref();
    const mapPolygon = ref();

    function arePointsNear(checkPoint, centerPoint, km) { 
      var ky = 40000 / 360;
      var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
      var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
      var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
      return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    function handleClick(event) {

      const centerPoint = { "lat": 6.172135, "lng": -75.600109 }
      const checkPoint = { "lat": 6.171031362988478, "lng": -75.60131293098453 }

      const result = arePointsNear(checkPoint, centerPoint, 0.2);
      console.log("DENTRO DEL CIRCULO? " + result)

      if (event.latLng?.lat) {
        mapPolygon.value.$polygonPromise.then(res => {
          let isWithinPolygon = res.containsLatLng(event.latLng.lat(), event.latLng.lng());
          console.log({isWithinPolygon})
        })
      }
    }

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
    @click="handleClick"
    :center="contratoStore.getPuntomedio"
    :zoom="15"
    map-type-id="roadmap"
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
            url: require('@/assets/images/marcadores/puntomedio.svg'),
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
            url: require(`@/assets/images/marcadores/${hallazgo.icono}`),
            scaledSize: { width: 32, height: 32 } }"
        :clickable="true"
        :draggable="false"
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
          }">

          <BubbleInfo
            @show-modal-historia="showHistoria" 
            @show-modal="enviarShow" 
            v-bind:hallazgo="hallazgo"
          />

          <GMapCircle
            :radius="200"
            :center="hallazgo.position"
            :options="circleOptions"
          />
        </GMapInfoWindow>
      </GMapMarker>
    <!-- </GMapCluster> -->
  </GMapMap>
</template>

<script>
import BubbleInfo from "@/components/BubbleInfo.vue";
import { ref, onMounted  } from "vue";
import { setupContainsLatLng } from "../utils/is-point-within-polygon.js"

export default {
  name: "MapaGeneral",

  components: {
    BubbleInfo
  },

  data() {
    return {
      circleOptions: {
        strokeColor: "#7768D3",
        strokeOpacity: 0.8,
        strokeWeight: 2,
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
    enviarShow() {
      this.$emit('showModal', true)
    },
    showHistoria() {
      this.$emit('showModalHistoria', true, this.contratoStore.getHallazgos)
      
  //     const map = new VueGoogleMaps.maps.Map(
  //   document.getElementById("map"),
  //   {
  //     zoom: 4,
  //     center: { lat: 37.09, lng: -95.712 },
  //     mapTypeId: "terrain",
  //   }
  // )

        // var circulo = new VueGoogleMaps.gmapApi.maps.Circle({
          var circulo = this.$refs.myMapRef.maps.Circle({
                center: "{ 'lng': -75.63256207566154, 'lat': 6.151953517996051 }",
                radius: 200
            })

            const puntoABuscar = "{ 'lng': -75.63256207566154, 'lat': 6.151953517996051 }"

            var estaAdentro = this.google.maps.geometry.poly.containsLocation(puntoABuscar, circulo)

            console.log(estaAdentro)
    
    },
    openMarker(id) {
        this.openedMarkerID = id
    },
    openInfoWindowTemplate(pos) {
      this.infoWindow.position = pos;
      this.infoWindow.open = true;

      this.clicked = true;
    }
  }

}
</script>
