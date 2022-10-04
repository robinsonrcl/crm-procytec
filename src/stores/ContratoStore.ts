import { defineStore } from "pinia"
import { arePointsNear } from "../utils/utilidades"

class typeEstructura { 
    id = 0 
    name = ''
    src = ''
    completed = false
}

class typeEstados { 
    id = 0 
    name = ''
    src = ''
    completed = false
}

export const useContratoStore = defineStore("ContratoStore", {
    // state
    state: () => {
        return {
            contratos: {
                contrato: [{
                    id: 0,
                    nombre: ""
                }]
            },
            corrientes: [String],
            corriente: [],
            path: [[]],
            puntomedio: { lat: 6.248353, lng: -75.580265 },
            hallazgos: [],
            componentes: [],
            estados: [],
            patologia: [],
            login: false,
            showPanel: Boolean(false),
            showHistorico: Boolean(false),
            showModalImages: Boolean(false),
            optionContrato: [],
            optionCorriente: [],
            estructuras: [
                { id: 1, name:"AZUD", src:"barrasAzud.png", completed: false },
                { id: 2, name:"PLACA", src:"circuloPlaca.png", completed: false },
                { id: 3, name:"MURO", src:"trianguloMuro.png", completed: false },
                { id: 4, name:"BARRAS", src:"cuadradoBarras.png", completed: false },
                { id: 5, name:"BANCA", src:"trianguloMuro.png", completed: false },
                { id: 6, name:"BOCATOMA", src:"cuadradoBarras.png", completed: false },
                { id: 7, name:"BOLSA DE GRAVILLA", src:"cuadradoBarras.png", completed: false },
                { id: 8, name:"CONTRADIQUE", src:"cuadradoBarras.png", completed: false },
                { id: 9, name:"CONTROL DE GRADIENTE", src:"cuadradoBarras.png", completed: false },
                { id: 10, name:"DIQUE", src:"cuadradoBarras.png", completed: false },
                { id: 11, name:"DIRECCIONADOR", src:"cuadradoBarras.png", completed: false },
                { id: 12, name:"GAVIÓN", src:"cuadradoBarras.png", completed: false },
                { id: 13, name:"LLAVE", src:"cuadradoBarras.png", completed: false },
                { id: 14, name:"TABIQUE", src:"cuadradoBarras.png", completed: false },
                { id: 15, name:"TRAVIEZA", src:"cuadradoBarras.png", completed: false },
            ],
            estadosfinales: [
                { id: 1, name:"Bueno", src:"colorVerde.png", completed: false },
                { id: 2, name:"Repotenciado", src:"colorAmarillo.png", completed: false },
                { id: 3, name:"Critico", src:"colorRojo.png", completed: false },
                { id: 4, name:"Otro", src:"colorVioleta.png", completed: false },
            ],
            circles: [],
            currentPhotos: []
        }
    },

    // getters
    getters: {
        getCurrentPhotos() {
            return this.currentPhotos
        },
        getCircles() {
            return this.circles
        },
        getShowPanel() {
            return this.showPanel
        },
        getShowHistorico() {
            return this.showHistorico
        },
        getShowModalImages() {
            return this.showModalImages
        },
        getEstados() {
            return this.estadosfinales
        },
        getEstructuras() {
            return this.estructuras
        },
        getComponentes() {
            return this.componentes
        },
        getCorrientes() {
            return this.corrientes
        },
        getPath() {
            return this.path
        },
        getPuntomedio() {
            return this.puntomedio
        },
        getHallazgos() {
            return this.hallazgos
        },
        getCountHallazgos() {
            return this.hallazgos.length
        },
        getPatologia() {
            return this.patologia
        },
        getLogin() {
            return this.login
        },
        getOptionContrato() {
            return this.optionContrato
        },
        getOptionCorriente() {
            return this.optionCorriente
        }
    },

    // actions
    actions: {
        setCurrentPhotos(newValue) {
            this.currentPhotos = newValue
        },
        setCircles(newValue) {
            this.circles = newValue
        },
        setOptionCorriente(newValue) {
            this.optionCorriente = newValue
        },
        setOptionContrato(newValue) {
            this.optionContrato = newValue
        },
        setShowModalImages(newValue) {
            this.showModalImages = !this.showModalImages
        },
        setShowPanel(newValue) {
            this.showPanel = !this.showPanel
        },
        setShowHistorico(newValue) {
            this.showHistorico = !this.showHistorico
        },
        setLogin(newValue) {
            this.login = newValue
        },
        async fill() {
            this.contratos = (await import("../data/contratos.json")).default
            this.drawHallazgos()
        },
        fillCorrientes(contratosId) {
            this.corrientes = []

            var contratos = this.contratos.contrato.filter(function(contrato) {
                return contratosId.some(item => item.id === contrato.id)
            })

            contratos.forEach(contrato => {
                contrato.corrientes.forEach(corriente => {
                    this.corrientes.push(corriente)
                })
            })
        },
        drawCorriente(contratosId, corrientesId) {
            var contratos = this.contratos.contrato.filter(function(contrato) {
                return contratosId.some(item => item.id === contrato.id)
            })

            this.path = []
            var corrientesBk = [{puntomedio: "" }]
            contratos.forEach(contrato => {
                var corrientes = contrato.corrientes.filter(function(corriente) {
                    return corrientesId.some(item => item.id === corriente.id)
                })
                corrientes.forEach(corriente => {
                    const newPath = {
                        corriente: corriente.coordenadas,
                        puntomedio: corriente.puntomedio
                    }

                    this.path.push(newPath)
                    corrientesBk.push(corriente)
                })
            })


            this.puntomedio = corrientesBk[(corrientesBk.length - 1)].puntomedio
            this.drawHallazgos(contratosId, corrientesId)
        },
        drawHallazgos(contratosId, corrientesId) {
            var componentesName = this.componentes
            var estadosName = this.estados

            if(estadosName.length === 0){
                this.hallazgos = []
                return
            }
            if(componentesName.length === 0) {
                this.hallazgos = []
                return
            }

            const contratos = this.contratos.contrato.filter(function(contratolocal) {
                return contratosId.some((itemuno: { id: any }) => itemuno.id === contratolocal.id)
            })

            this.hallazgos = []
            contratos.forEach(contrato => {
                var nombreContrato = contrato.nombre
                var corrientes = contrato.corrientes.filter(function(corriente) {
                    return corrientesId.some(item => item.id === corriente.id)
                })

                corrientes.forEach(corriente => {
                    var hallazgos = corriente.hallazgos.filter(function(hallazgo) {
                        return componentesName.some((item: typeEstructura) => item.name === hallazgo.componente)
                    })

                    var hallazgosSegunEstado = hallazgos.filter(function(evento) {
                        return estadosName.some((item: typeEstados) => item.name === evento.estado)
                    }) 

                    hallazgosSegunEstado.forEach(hallazgo => {

                        if(hallazgo.fotos === ""){
                            hallazgo.fotos = [{ "id": "1000", "src": "sinfoto.svg" }]
                        }

                        const newhallazgo = {
                            id: hallazgo.id,
                            nombrecontrato: nombreContrato,
                            icono: hallazgo.icono,
                            fecha: hallazgo.fecha,
                            componente: hallazgo.componente,
                            nomenclatura: hallazgo.nomenclatura,
                            margen: hallazgo.margen,
                            hallazgo1: hallazgo.hallazgo1,
                            hallazgo2: hallazgo.hallazgo2,
                            hallazgo3: hallazgo.hallazgo3,
                            estado: hallazgo.estado,
                            
                            
                            observacion: hallazgo.observacion,
                            estadoanterior: hallazgo.estadoanterior,
                            afectacion: hallazgo.afectacion,
                            nivelriesgo: hallazgo.nivelriesgo,
                            coordenadas: hallazgo.coordenadas,
                            position: hallazgo.position,
                            fotos: hallazgo.fotos,
                            referencia: hallazgo.referencia,
                            zona: hallazgo.zona,
                            tramo1: hallazgo.tramo1,
                            abscisakm: hallazgo.abscisakm,
                            revisor: hallazgo.revisor,
                            shapeleng: hallazgo.shapeleng,
                            diagnostico: hallazgo.diagnostico,
                            criticidad: hallazgo.criticidad,
                            tipodiseno: hallazgo.tipodiseno,
                            propuesta: hallazgo.propuesta,
                            costo: hallazgo.costo,
                            cota: hallazgo.cota,
                            linkdiseno: hallazgo.linkdiseno
                        }

                        this.hallazgos.push(newhallazgo)
                        this.puntomedio = newhallazgo.position
                    })
                })
            })
        },
        setComponentes(componentes) {
            this.componentes = componentes
        },
        setEstados(estados) {
            this.estados = estados
        },
        loadPatologia(centerPoint) {
            this.patologia = []
            this.contratos.contrato.forEach(contrato => {
                const nombreContrato = contrato.nombre

                contrato.corrientes.forEach(corriente => {
                    corriente.hallazgos.forEach(hallazgo => {
                        const checkPoint = hallazgo.position

                        if(centerPoint.lat != checkPoint.lat && centerPoint.lng != checkPoint.lng){

                            if(arePointsNear(checkPoint, centerPoint, 0.2)){

                                if(hallazgo.fotos === ""){
                                    hallazgo.fotos = [{ "id": "1000", "src": "sinfoto.svg" }]
                                }

                                const newHallazgo = {
                                    id: hallazgo.id,
                                    nombrecontrato: nombreContrato,
                                    icono: hallazgo.icono,
                                    fecha: hallazgo.fecha,
                                    componente: hallazgo.componente,
                                    nomenclatura: hallazgo.nomenclatura,
                                    margen: hallazgo.margen,
                                    hallazgo1: hallazgo.hallazgo1,
                                    hallazgo2: hallazgo.hallazgo2,
                                    hallazgo3: hallazgo.hallazgo3,
                                    estado: hallazgo.estado,
                                    observacion: hallazgo.observacion,
                                    estadoanterior: hallazgo.estadoanterior,
                                    afectacion: hallazgo.afectacion,
                                    nivelriesgo: hallazgo.nivelriesgo,
                                    coordenadas: hallazgo.coordenadas,
                                    position: hallazgo.position,
                                    fotos: hallazgo.fotos,
                                    referencia: hallazgo.referencia,
                                    zona: hallazgo.zona,
                                    tramo1: hallazgo.tramo1,
                                    abscisakm: hallazgo.abscisakm,
                                    revisor: hallazgo.revisor,
                                    shapeleng: hallazgo.shapeleng,
                                    diagnostico: hallazgo.diagnostico,
                                    criticidad: hallazgo.criticidad,
                                    tipodiseno: hallazgo.tipodiseno,
                                    propuesta: hallazgo.propuesta,
                                    costo: hallazgo.costo,
                                    cota: hallazgo.cota,
                                    linkdiseno: hallazgo.linkdiseno
                                }
                                this.patologia.push(newHallazgo)
                            }
                        }
                    })
                })
            })
        }
    }
})
