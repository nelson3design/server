const mongoose = require('mongoose')

const Banner = mongoose.model('Banner', {
    tipo: String,
    file:String

})

module.exports = Banner