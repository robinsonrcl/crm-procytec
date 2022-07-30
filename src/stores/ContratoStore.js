// import { some } from "fs"
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
            hallazgos: []
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
            this.drawHallazgos()
        },
        drawHallazgos(componentesName, contratosId, corrientesId) {
            const contratos = this.contratos.contrato.filter(function(contratolocal) {
                return contratosId.some(itemuno => itemuno.id === contratolocal.id)
            })

            this.hallazgos = []
            contratos.forEach(contrato => {
                var corrientes = contrato.corrientes.filter(function(corriente) {
                    return corrientesId.some(item => item.id === corriente.id)
                })

                corrientes.forEach(corriente => {
                    var hallazgos = corriente.hallazgos.filter(function(hallazgo) {
                        return componentesName.some(item => item === hallazgo.componente)
                    })

                    hallazgos.forEach(visita => {
                        this.hallazgos.push(visita)
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
        }
    }
})

