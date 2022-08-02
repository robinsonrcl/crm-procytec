import { defineStore } from "pinia"

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
            estados: []
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
            return this.hallazgos
        }
    },

    // actions
    actions: {
        async fill() {
            this.contratos = (await import("@/data/contratos.json")).default
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
                    this.path.push(corriente.coordenadas)
                    corrientesBk.push(corriente)
                })
            })

            this.puntomedio = corrientesBk[0].puntomedio
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

                    hallazgosSegunEstado.forEach(visita => {
                        console.log("Nombre contrato: " + nombreContrato)

                        const newVisita = {
                            id: visita.id,
                            nombrecontrato: nombreContrato,
                            icono: visita.icono,
                            fecha: visita.fecha,
                            componente: visita.componente,
                            nomenclatura: visita.nomenclatura,
                            margen: visita.margen,
                            hallazgo1: visita.hallazgo1,
                            hallazgo2: visita.hallazgo2,
                            hallazgo3: visita.hallazgo3,
                            estado: visita.estado,
                            observacion: visita.observacion,
                            estadoanterior: visita.estadoanterior,
                            afectacion: visita.afectacion,
                            nivelriesgo: visita.nivelriesgo,
                            coordenadas: visita.coordenadas,
                            position: visita.position,
                            fotos: visita.fotos,
                            referencia: visita.referencia,
                            zona: visita.zona,
                            tramo1: visita.tramo1,
                            abscisakm: visita.abscisakm,
                            revisor: visita.revisor,
                            shapeleng: visita.shapeleng,
                            diagnostico: visita.diagnostico,
                            criticidad: visita.criticidad,
                            tipodiseno: visita.tipodiseno,
                            propuesta: visita.propuesta,
                            costo: visita.costo,
                            cota: visita.cota,
                            linkdiseno: visita.linkdiseno
                        }

                        this.hallazgos.push(newVisita)
                    })
                })
            })

            //     {   
            //         id: 1, 
            //         position: { "lng": -75.579726299728918, "lat": 6.202010620893475 },
            //         icono: require('@/assets/images/gif/cuadradoAlert.gif'),
            //         agreement: 'CI446-2012',
            //         description: 'Barra de sedimentos (curva interna) ocupando aproximadamente el 40% del ancho del canal y direcciona el flujo hacia el costado izquierdo; residuos muro antiguo canalización, descarga aguas residuales margen izquierda, placas con desgaste natural',
            //         frame: 'PLACA',
            //         photos: [
            //             { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
            //             { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
            //             { title: 'Margen del Rio', url: require('@/assets/photos/100.jpg') },
            //         ]
            //     },
        },
        setComponentes(componentes) {
            this.componentes = componentes
        },
        setEstados(estados) {
            this.estados = estados
        }
    }
})

