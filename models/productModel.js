const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    file: String,
    nome: String,
    description: String,
    preco:Number,
    categoria:String,
    destaque: String,

})

module.exports = Product