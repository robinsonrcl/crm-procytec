<template>
  <GMapMap
    :center="center"
    :zoom="15"
    :disableDefaultUI="true"
    :options="options"
    ref="myMapRef"
    map-type-id="satellite"
    style="width: 1300px; height: 900px"
  >
    <GMapCluster
        :minimumClusterSize="3"
        :styles="clusterIcon"
        :zoomOnClick="true"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="{ url: m.icono, scaledSize: { width: 26, height: 26 } }"
        :clickable="true"
        :draggable="false"
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
                        <div style="text-align: center"><a href="">>> mas fotos... 📸</a></div>
                    </div>
                </div>
            </div>
        </div>
      </GMapInfoWindow>
      
    </GMapMarker>
    </GMapCluster>
  </GMapMap>
    
  
</template>

<script>
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { ref, watch } from "vue";

function addMyButton(map) {
  const controlUI = document.createElement("div");
//   controlUI.style="background-color: white; roun";
  controlUI.className="divColores"
  controlUI.title = "Click para hacer zoom";
  const controlText = document.createElement("div");
  controlText.innerHTML = `
  <div class="titletextbubble" style="text-align: left; ">COLORES</div>
    <div style="display: table-row;">
        <div style="display: table-cell; ">
            <div style="height: 13px;"><img src="` + require('@/assets/images/muestraAmarillo.svg') + `" class="muestraColor" /></div>
            <div style="height: 13px;"><img src="` + require('@/assets/images/muestraVerde.svg') + `" class="muestraColor" /></div>
            <div style="height: 13px;"><img src="` + require('@/assets/images/muestraRojo.svg') + `" class="muestraColor" /></div>
            <div style="height: 13px;"><img src="` + require('@/assets/images/muestraVioleta.svg') + `" class="muestraColor" /></div>
        </div>
        <div style="display: table-cell; text-align: left;">
            <div style="height: 13px;">Repotenciado</div>
            <div style="height: 13px;">En buen estado</div>
            <div style="height: 13px;">En mal estado</div>
            <div style="height: 13px;">Otro estado</div>
        </div>
    </div>
    <hr/>
    <div class="titletextbubble" style="text-align: left; ">ESTRUCTURAS</div>
    <div style="display: table-row;">
        <div style="display: table-cell; padding-right: 4px; ">
            <div class="rowDivBubble"><img src="` + require('@/assets/images/muestraCirculo.svg') + `" class="muestraEstructura" /></div>
            <div class="rowDivBubble"><img src="` + require('@/assets/images/muestraTriangulo.svg') + `" class="muestraEstructura" /></div>
            <div class="rowDivBubble"><img src="` + require('@/assets/images/muestraCuadrado.svg') + `" class="muestraEstructura" /></div>
            <div class="rowDivBubble"><img src="` + require('@/assets/images/muestraBarras.svg') + `" class="muestraEstructura" /></div>
        </div>
        <div style="display: table-cell; text-align: left;">
            <div class="rowDivBubble">PLACAS</div>
            <div class="rowDivBubble">MUROS</div>
            <div class="rowDivBubble">BARRAS</div>
            <div class="rowDivBubble">AZUD</div>
        </div>
    </div>
  `;
  controlUI.appendChild(controlText);

//   controlUI.addEventListener("click", () => {
//     map.setZoom(map.getZoom() + 1);
//   });

  // eslint-disable-next-line no-undef
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlUI);
}

export default {
  name: "MapaGeneral",

  setup() {
    const myMapRef = ref();

    watch(myMapRef, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          addMyButton(map);
        });
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
                icono: require('@/assets/images/trianguloAmarillo.svg'),
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
                icono: require('@/assets/images/barrasVerde.svg'),
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
                icono: require('@/assets/images/cuadradoRojo.svg'),
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
                icono: require('@/assets/images/circuloVioleta.svg'),
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
