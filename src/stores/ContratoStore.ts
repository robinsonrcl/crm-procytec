import { acceptHMRUpdate, defineStore } from "pinia";
import { arePointsNear } from "../utils/utilidades";
import axios from "axios";
import { stringifyQuery } from "vue-router";
import { faThList } from "@fortawesome/free-solid-svg-icons";

class typeEstructura {
  id = 0;
  name = "";
  src = "";
  completed = false;
}

class typeEstados {
  id = 0;
  name = "";
  src = "";
  completed = false;
}
class componenteClass {
  id: string;
  name: string;
}
class estadoClass {
  id: string;
  name: string;
}

class Hallazgos {
  diagnostico: String;
  observacion: String;
  tramo1: String;
  position: String;
  shapeleng: Number;
  nivelriesgo: String;
  revisors: [
    {
      cedula: Number;
      id: String;
      nombres: String;
      nickname: String;
      apellidos: String;
    }
  ];
  estadoanterior: Number;
  zona: String;
  linkdiseno: String;
  hallazgo2: String;
  nomenclatura: String;
  margen: String;
  corriente: { id: String };
  cota: String;
  propuesta: String;
  coordenadas: String;
  id: String;
  componente: String;
  fotos: [
    {
      id: String;
      src: String;
      etiqueta: String;
    }
  ];
  costo: Number;
  fecha: Date;
  afectacion: String;
  tipodiseno: String;
  icono: String;
  referencia: String;
  abscisakm: Number;
  colorestado: String;
  hallazgo1: String;
  hallazgo3: String;
  estado: String;
  criticidad: String;
}

let urlFluvialApi = import.meta.env.VITE_URL_FLUVIALAPI;

export const useContratoStore = defineStore("ContratoStore", {
  // state
  state: () => {
    return {
      contratos: [
        {
          nombre: String,
          descripcion: String,
          id: String,
          year: Number,
          fecha: Date,
          mes: Number,
          corriente: [
            {
              puntomedio: String,
              nombre: String,
              descripcion: String,
              id: String,
              contrato: String,
              coordenadas: String,
              fecha: Date,
            },
          ],
        },
      ],
      corrientes: [],
      corriente: [],
      path: [{ corriente: String, puntomedio: String }],
      puntomedio: { lat: 6.248353, lng: -75.580265 },
      hallazgos: [],
      // {
      //   diagnostico: String,
      //   observacion: String,
      //   tramo1: String,
      //   position: String,
      //   shapeleng: Number,
      //   nivelriesgo: String,
      //   revisors: [
      //     {
      //       cedula: Number,
      //       id: String,
      //       nombres: String,
      //       nickname: String,
      //       apellidos: String
      //     }
      //   ],
      //   estadoanterior: Number,
      //   zona: String,
      //   linkdiseno: String,
      //   hallazgo2: String,
      //   nomenclatura: String,
      //   margen: String,
      //   corriente: { id: String },
      //   cota: String,
      //   propuesta: String,
      //   coordenadas: String,
      //   id: String,
      //   componente: String,
      //   fotos: [{
      //     id: String,
      //     src: String,
      //     etiqueta: String
      //   }],
      //   costo: Number,
      //   fecha: Date,
      //   afectacion: String,
      //   tipodiseno: String,
      //   icono: String,
      //   referencia: String,
      //   abscisakm: Number,
      //   colorestado: String,
      //   hallazgo1: String,
      //   hallazgo3: String,
      //   estado: String,
      //   criticidad: String
      // }
      // ],
      componentes: [],
      estados: [new estadoClass()],
      patologia: [],
      login: false,
      showPanelCapas: Boolean(false),
      showHistorico: Boolean(false),
      showModalImages: Boolean(false),
      optionContrato: [],
      optionCorriente: [],
      estructuras: [
        {
          id: String,
          nombre: String,
          icono: String,
          estado: Boolean,
        },
      ],
      estadosfinales: [
        {
          id: String,
          estado: Boolean,
          nombre: String,
          icono: String,
        },
      ],
      circles: [],
      currentPhotos: [],
      message: {
        message: "Hola Mundo!",
        color: "#FFFF00",
        duration: 5,
        hidden: false,
      },
      dataChartGeneral: [
        ["Componentes", "#"],
        ["Comp", 0],
      ],
      dataChartEstados: [
        ["Estado", "#"],
        ["N/A", 0],
      ],
      showDashboard: Boolean(false),
      showPanelAgreement: Boolean(false),
      showPanelUsuario: Boolean(false),
      showRegister: Boolean(false),
    };
  },

  // getters
  getters: {
    getShowRegister() {
      return this.showRegister;
    },
    getShowDashboard() {
      return this.showDashboard;
    },
    getChartEstados() {
      return this.dataChartEstados;
    },
    getChartGeneral() {
      return this.dataChartGeneral;
    },
    getMessage() {
      return this.message;
    },
    getCurrentPhotos() {
      return this.currentPhotos;
    },
    getCircles() {
      return this.circles;
    },
    getShowPanelCapas() {
      return this.showPanelCapas;
    },
    getShowPanelAgreement() {
      return this.showPanelAgreement;
    },
    getShowPanelUsuario() {
      return this.showPanelUsuario;
    },
    getShowHistorico() {
      return this.showHistorico;
    },
    getShowModalImages() {
      return this.showModalImages;
    },
    getEstados() {
      return this.estadosfinales;
    },
    getEstructuras() {
      return this.estructuras;
    },
    getComponentes() {
      return this.componentes;
    },
    getCorrientes() {
      return this.corrientes;
    },
    getContratos() {
      return this.contratos
    },
    getPath() {
      return this.path;
    },
    getPuntomedio() {
      return this.puntomedio;
    },
    getHallazgos() {
      return this.hallazgos;
    },
    getCountHallazgos() {
      return this.hallazgos.length;
    },
    getPatologia() {
      return this.patologia;
    },
    getLogin() {
      return this.login;
    },
    getOptionContrato() {
      return this.optionContrato;
    },
    getOptionCorriente() {
      return this.optionCorriente;
    },
  },

  // actions
  actions: {
    setUser(newUser) {
      this.user.email = newUser.email
      this.user.name = newUser.name
      this.user.password = newUser.password
      this.user.profilePicture = newUser.profilePicture
      this.user.siwaIdentifier = newUser.siwaIdentifier
      this.user.twitterURL = newUser.twitterURL
      this.user.username = newUser.username
    },
    setShowRegister(newValue) {
      this.showRegister = newValue;
    },
    setHallazgos() {
      this.hallazgos = []
    },
    setMessage(message, duration) {
      this.message.hidden = !this.message.hidden;
      this.message.message = message;
      setTimeout(() => {
        this.message.hidden = !this.message.hidden;
      }, duration);
    },
    setCurrentPhotos(newValue) {
      this.currentPhotos = newValue;
    },
    setCircles(newValue) {
      this.circles = newValue;
    },
    setOptionCorriente(newValue) {
      this.optionCorriente = newValue;
    },
    setOptionContrato(newValue) {
      this.optionContrato = newValue;
    },
    setShowModalImages(newValue) {
      this.showModalImages = !this.showModalImages;
    },
    setShowPanel(newValue) {
      switch (newValue) {
        case "Capas":
          this.showPanelCapas = !this.showPanelCapas;
          this.showPanelAgreement = false;
          this.showPanelUsuario = false;
          break;
          case "Agreement":
          this.showPanelAgreement = !this.showPanelAgreement;    
          this.showPanelCapas = false;
          this.showPanelUsuario = false;
          break;
          case "Usuario":
          this.showPanelUsuario = !this.showPanelUsuario;
          this.showPanelCapas = false;
          this.showPanelAgreement = false;
          break;
      }
      
    },
    setShowHistorico(newValue) {
      this.showHistorico = !this.showHistorico;
    },
    setLogin(newValue) {
      this.login = newValue;
    },
    setFalseEstructuras(newValue) {
      this.estructuras.forEach((estructura) => {
        estructura.estado = false;
      });
    },
    setFalseEstados(newValue) {
      this.estadosfinales.forEach((estado) => {
        estado.estado = false;
      });
    },
    async fill() {
      await axios
        .get(urlFluvialApi + "/api/componentes/")
        .then((response) => {
          this.estructuras = response.data;
        })
        .catch((_error) => {})
        .then(() => {});

      await axios
        .get(urlFluvialApi + "/api/estados/")
        .then((response) => {
          this.estadosfinales = response.data;
        })
        .catch((_error) => {})
        .then(() => {});
        
      await axios
        .get(urlFluvialApi + "/api/contratos/")
        .then((response) => {
          this.contratos = response.data;
        })
        .catch((_error) => {})
        .then(() => {});
    },
    fillCorrientes(contratosId) {
      this.corrientes = [];

      var contratos = this.contratos.filter(function (contrato) {
        return contratosId.some((item) => item.id === contrato.id);
      });

      contratos.forEach((contrato) => {
        contrato.corriente.forEach((corriente) => {
          this.corrientes.push(corriente);
        });
      });
    },
    drawCorriente(contratosId, corrientesId) {
      var contratos = this.contratos.filter(function (contrato) {
        return contratosId.some((item) => item.id === contrato.id);
      });

      this.path = [];
      var corrientesBk = [{ puntomedio: "" }];

      contratos.forEach((contrato) => {
        var corrientes = contrato.corriente.filter(function (corriente) {
          return corrientesId.some((item) => item.id === corriente.id);
        });
        corrientes.forEach((corriente) => {
          const newPath = {
            corriente: JSON.parse(corriente.coordenadas.toString()),
            puntomedio: JSON.parse(corriente.puntomedio.toString()),
          };

          this.path.push(newPath);
          corrientesBk.push(corriente);
        });
      });

      this.puntomedio = corrientesBk[corrientesBk.length - 1].puntomedio;
      this.drawHallazgos(corrientesId);
    },
    async drawHallazgos(corrientesId) {
      var componentesName = this.componentes;
      var estadosName = this.estados;

      // Fields for get data from API
      class ArraySearch {
        corrientes = [];
        componentes = [];
        estados = [];

        init() {}
      }

      if (estadosName.length === 0) {
        this.hallazgos = [];
        return;
      }
      if (componentesName.length === 0) {
        this.hallazgos = [];
        return;
      }

      let filtersHallazgos = new ArraySearch();

      if (this.componentes.length > 0) {
        this.componentes.forEach((componente) => {
          filtersHallazgos.componentes.push(componente.name);
        });
      }

      if (this.estados.length > 0) {
        this.estados.forEach((estado) => {
          filtersHallazgos.estados.push(estado.name);
        });
      }

      if (corrientesId.length > 0) {
        corrientesId.forEach((corriente) => {
          filtersHallazgos.corrientes.push(corriente.id);
        });
      }
      // ------------

      await axios
        .post(urlFluvialApi + "/api/search", filtersHallazgos)
        .then((response) => {
          this.hallazgos = response.data;

          var countPlaca = 0;
          var countMuro = 0;
          var countAzud = 0;
          var countBarra = 0;
          var countObstruccion = 0;

          var countBueno = 0;
          var countRegular = 0;
          var countMalo = 0;
          var countNA = 0;

          this.hallazgos.forEach((hallazgo) => {
            switch (hallazgo.estado) {
              case "BUENO":
                countBueno += 1;
                break;
              case "REGULAR":
                countRegular += 1;
                break;
              case "MALO":
                countMalo += 1;
                break;
              case "NA":
                countNA += 1;
                break;
            }
            switch (hallazgo.componente) {
              case "PLACA":
                countPlaca += 1;
                break;
              case "MURO":
                countMuro += 1;
                break;
              case "ESTRUCTURA_DE_CAIDA":
                countAzud += 1;
                break;
              case "BARRA":
                countBarra += 1;
                break;
              case "OBSTRUCCION":
                countObstruccion += 1;
                break;
            }
          });
          this.dataChartGeneral = [
            ["Estructura", "#"],
            ["Placa", countPlaca],
            ["Muro", countMuro],
            ["Azud", countAzud],
            ["Barra", countBarra],
            ["Obstruccion", countObstruccion],
          ];
          this.dataChartEstados = [
            ["Estado", "#"],
            ["Bueno", countBueno],
            ["Regular", countRegular],
            ["Malo", countMalo],
            ["NA", countNA],
          ];
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {}
        );

      //axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      let ultimoHallazgo = this.hallazgos[this.hallazgos.length - 1];

      this.puntomedio = ultimoHallazgo.position;
    },

    setComponentes(componentes) {
      this.componentes = [];
      let componenteLocal: componenteClass;

      componentes.forEach((componente) => {
        componenteLocal = new componenteClass();
        componenteLocal.id = componente.id;
        componenteLocal.name = componente.nombre;

        this.componentes.push({ id: componente.id, name: componente.nombre });
      });
    },
    setEstados(estados) {
      this.estados = [];
      let estadoLocal: estadoClass;

      estados.forEach((estado) => {
        estadoLocal = new estadoClass();
        estadoLocal.id = estado.id;
        estadoLocal.name = estado.nombre;

        this.estados.push(estadoLocal);
      });
    },
    async loadPatologia(centerPoint: String) {
      class CheckPoint {
        lat = 0.0;
        lng = 0.0;

        init() {}
      }

      this.patologia = [];
      let checkPoint = new CheckPoint();

      let uno = centerPoint.split(",");
      let unoa = uno[0];
      let unob = unoa.split(":");
      let unoc = unob[1].trim();
      let lat = parseFloat(unoc);
      // ----
      let uno1 = uno[1];
      let uno2 = uno1.split(":");
      var uno3 = uno2[1].replaceAll("}", "");
      uno3 = uno3.trim();
      let lng = parseFloat(uno3);

      checkPoint.lat = lat;
      checkPoint.lng = lng;

      await axios
        .post(urlFluvialApi + "/api/patologia", checkPoint)
        .then((response) => {
          this.patologia = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {});
    },
  },
});
