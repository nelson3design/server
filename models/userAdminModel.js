const mongoose = require('mongoose')

const UserAdmin = mongoose.model('UserAdmin', {
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = UserAdmin