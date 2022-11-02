const mongoose = require('mongoose')

const Pedido = mongoose.model('Pedido', {
    costumer: {
        type: String,
        require: true
    },
    idCliente: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    confirmar: {
    type: String,
    default: "off"
    },
    cancelar: {
    type: String,
    default: "off"
    },
    preparar: {
        type: String,
        default: "off"
    },
    terminar: {
        type: String,
        default: "off"
    },
    entregar: {
        type: String,
        default:"off"
    },
    finalizar: {
        type: String,
        default: "off"
    },
    data: {
        type: Date,
        default: Date.now()
    },
    pedido: {
        type: Array,
        default: []
    }

})

module.exports = Pedido