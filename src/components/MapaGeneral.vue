<template>
  <GMapMap
    :center="center"
    :zoom="15"
    :disableDefaultUI="true"
    :options="options"
    ref="myMapRef"
    map-type-id="roadmap"
    style="width: 100%; height: 100%;"
  >
    <!-- <GMapCluster
        :minimumClusterSize="3"
        :styles="clusterIcon"
        :zoomOnClick="true"
        
    > -->
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="{ 
            url: m.icono, 
            scaledSize: { width: 32, height: 32 } }"
        :clickable="true"
        :draggable="false"
        :markerlabel="{ text: 'Hola Mundo' }"
        @click="openMarker(m.id)"
        
      >

      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID == m.id"
        :options=" {
              pixelOffset: {
                width: 10, height: 0
              },
              maxWidth: 380,
              maxHeight: 320,
       }"
        >
        <div style="width: 100%; text-align: left; display: inline-block; display: table;">
            <div>
                <div style="display: table-row;">
                    <div style="display: table-cell; ">
                        <div class="titletextbubble" style="text-align: left">Contrato: {{ m.agreement }}</div>
                        <div style="text-align: left; font-weight:500">Estructura: {{ m.frame }}</div>
                        <hr/>
                        <div style="text-align: left">{{ m.description }}</div>
                    </div>
                    <div style="display: table-cell;" class="centerImgDiv">
                        <img :src="m.photos[0].url" class="photoPreview" />
                        <div style="text-align: center">
                          <button class="button__masfotos"
                            @click.prevent="enviarShow">
                            + fotos 📸
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </GMapInfoWindow>
      
    </GMapMarker>
    <!-- </GMapCluster> -->
  </GMapMap>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "MapaGeneral",

  setup() {
    const myMapRef = ref();

    watch(myMapRef, (googleMap) => {
      if (googleMap) {
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
        center: { lat: 6.248353, lng: -75.580265 },
        markers: [
            {   
                id: 1, 
                position: { lat: 6.248353, lng: -75.580265 }, 
                icono: require('@/assets/images/gif/cuadradoAlert.gif'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 2, 
                position: { lat: 6.255761, lng: -75.576026 }, 
                icono: require('@/assets/images/marcadores/trianguloVerde.svg'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/200.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 3, 
                position: { lat: 6.255081, lng: -75.577046 }, 
                icono: require('@/assets/images/gif/circuloAlert.gif'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/300.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 4, 
                position: { lat: 6.243654, lng: -75.579123 }, 
                icono: require('@/assets/images/gif/barrasAlert.gif'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/400.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 5, 
                position: { lat: 6.236059, lng: -75.575871 }, 
                icono: require('@/assets/images/marcadores/barrasVioleta.svg'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/400.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 6, 
                position: { lat: 6.241863, lng: -75.578380, }, 
                icono: require('@/assets/images/gif/trianguloAlert.gif'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/400.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 7, 
                position: { lat: 6.233974, lng: -75.575691 }, 
                icono: require('@/assets/images/gif/circuloAlert.gif'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/400.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
            { 
                id: 8, 
                position: { lat: 6.239124, lng: -75.577575 }, 
                icono: require('@/assets/images/marcadores/circuloAmarillo.svg'),
                agreement: 'CI446-2012',
                description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
                frame: 'PLACA',
                photos: [
                    { title: 'Margen del Rio', url: require('@/assets/photos/400.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                    { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
                ]
            },
        ],
        options: {
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
        },
    };
  },

  methods: {
    enviarShow() {
      this.$emit('showModal', true)
    },
    openMarker(id) {
        this.openedMarkerID = id
    },

    openInfoWindowTemplate(pos) {
      this.infoWindow.position = pos;
      this.infoWindow.open = true;

      this.clicked = true;
    },
  },
};

</script>
