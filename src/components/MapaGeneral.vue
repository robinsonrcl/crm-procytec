<template>
  <GMapMap
    :center="center"
    :zoom="15"
    :disableDefaultUI="true"
    :options="options"
    ref="myMapRef"
    map-type-id="satellite"
    style="width: 1000px; height: 900px"
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
        :icon="{ 
            url: m.icono, 
            scaledSize: { width: 26, height: 26 } }"
        :clickable="true"
        :draggable="false"
        @click="openMarker(m.id)"
        :markerlabel="{ text: 'Hola Mundo' }"
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
import { ref, watch } from "vue";

function addMyButton(map) {
  const controlUI = document.createElement("div");
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
            <div style="height: 13px;" class="typefontBubble">Repotenciado</div>
            <div style="height: 13px;" class="typefontBubble">En buen estado</div>
            <div style="height: 13px;" class="typefontBubble">En mal estado</div>
            <div style="height: 13px;" class="typefontBubble">Otro estado</div>
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
            <div class="rowDivBubble typefontBubble">PLACAS</div>
            <div class="rowDivBubble typefontBubble">MUROS</div>
            <div class="rowDivBubble typefontBubble">BARRAS</div>
            <div class="rowDivBubble typefontBubble">AZUD</div>
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
                icono: require('@/assets/images/pato.gif'),
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
                icono: require('@/assets/images/alerta.gif'),
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


// 0:00 - Introducción
// 5:05 - Comienzo del Curso
// 8:10 - Editor de texto
// 17:55 - Estructura
// 20:26 - Selectores
// 39:57 - Especificidad
// 52:33 - Metodología BEM
// 59:05 - Unidades
// 1:09:00 - Propiedades de Texto
// 1:14:20 - Tipografías externas
// 1:18:18 - Normalize
// 1:25:10 - Cajas
// 1:33:17 - Padding
// 1:39:07 - Width y Height
// 1:39:26 - Box Sizing
// 1:41:53 - Margin
// 1:44:10 - Bordes
// 1:47:03 - Box Model
// 1:49:41 - Sombras
// 1:55:32 - Outline
// 2:05:28 - Position
// 2:06:56 - Position Static
// 2:08:19 - Position Relative
// 2:13:56 - Z Index
// 2:23:10 - Position Absolute
// 2:39:37 - Position Fixed
// 2:44:28 - Position Sticky

// -------------- CSS Intermedio --------------

// 2:47:19 - Display
// 2:55:30 - Overflow
// 3:02:06 - Float
// 3:10:19 - Pseudoelementos
// 3:24:05 - Pseudoclases
// 3:43:42 - Objet Fit
// 3:52:35 - Objet Position
// 3:53:58 - Cursor
// 3:56:31 - Colorización (ColorName, Hex, RGB/A)
// 4:09:53 - Conceptos Básicos de Responsive
// 4:18:25 - Menu Responsive
// 4:46:44 - Introducción a Flexbox
// 4:48:55 - Conceptos de Flexbox
// 4:53:23 - Display Flex
// 4:57:14 - Flex direction
// 5:01:55 - Flex wrap
// 5:06:20 - Alineacion en Flex
// 5:21:10 - Flex Grow
// 5:25:47 - Flex Basis
// 5:27:29 - Flex Shrink
// 5:36:15 - Order
// 5:40:22 - Formulario con Flex
// 6:05:00 - Conceptos de Grid
// 6:15:47 - Display Grid
// 6:17:44 - Grid Templates
// 6:20:26 - Medidas especiales de Grid
// 6:23:30 - Grid Gap
// 6:25:15 - Asignación de espacios
// 6:34:06 - Repeat()
// 6:38:41 - Grid Implícito y Explícito
// 6:40:51 - Grid Auto
// 6:48:41 - Grid Dinámico
// 6:59:16 - Alineación en Grid
// 7:15:49 - Galería en Grid
// 7:23:17 - Grid Areas
// 7:31:09 - Nombrar Grid Lines
// 7:37:14 - Grid Shorthands
// 7:40:06 - Responsive Design
// 7:57:01 - Estructura Responsive Básica

// -------------- CSS Avanzado --------------

// 8:08:09 - Transition
// 8:23:31 - Animaciones
// 8:36:50 - Cubic Bezier
// 8:42:21 - Transform
// 8:49:21 - Clip Path
// 8:55:34 - Background
// 9:07:00 - Variables
// 9:11:47 - Filtros
// 9:21:24 - Práctica con Filter
// 9:24:34 - Direction
// 9:25:51 - Letter Spacing
// 9:26:36 - Scroll Behavior
// 9:28:42 - User Selected
// 9:31:20 - Práctica Final
// 9:40:11 - Continua Aprendiendo
