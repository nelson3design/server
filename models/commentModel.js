const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
    idProduct: {
        type: mongoose.ObjectId,
        require: true
    },
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    file: String
   

})

module.exports = Comment