const mongoose = require('mongoose')

const User = mongoose.model('User', {
    nome: {
        type: String,
        require: true
    },
    cpf: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefone: {
        type: Array,
        default: []
    },
    endereco: {
        type: Array,
        default: []
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = User