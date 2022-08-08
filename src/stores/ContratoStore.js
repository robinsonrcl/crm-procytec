import { defineStore } from "pinia"
import { arePointsNear } from "../utils/utilidades"

export const useContratoStore = defineStore("ContratoStore", {
    // state
    state: () => {
        return {
            contratos: [],
            corrientes: [],
            corriente: [],
            path: [[]],
            puntomedio: { lat: 6.248353, lng: -75.580265 },
            hallazgos: [],
            componentes: [],
            estados: [],
            patologia: []
        }
    },

    // getters
    getters: {
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
            console.log("getHallazgos: " + this.hallazgos.length)
            return this.hallazgos
        },
        getPatologia() {
            return this.patologia
        }
    },

    // actions
    actions: {
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
            var corrientesBk = []
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
                return contratosId.some(itemuno => itemuno.id === contratolocal.id)
            })

            this.hallazgos = []
            contratos.forEach(contrato => {
                var nombreContrato = contrato.nombre
                var corrientes = contrato.corrientes.filter(function(corriente) {
                    return corrientesId.some(item => item.id === corriente.id)
                })

                corrientes.forEach(corriente => {
                    var hallazgos = corriente.hallazgos.filter(function(hallazgo) {
                        return componentesName.some(item => item === hallazgo.componente)
                    })

                    var hallazgosSegunEstado = hallazgos.filter(function(evento) {
                        return estadosName.some(item => item === evento.estado)
                    }) 

                    hallazgosSegunEstado.forEach(hallazgo => {
                        console.log("Nombre contrato: " + nombreContrato)

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

// 1. Que Panel de patología solo muestre hallazgos en 200 mts -> OK
// 2. Dibujar la geometria del hallazgo -> OK
// 3. Programa que convierta excel en JSON
// 4. Publicar la aplicación