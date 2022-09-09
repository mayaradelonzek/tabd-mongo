const mongoose = require('mongoose')

const Animais = mongoose.model('Animais', {    
    raca: String,
    tamanho: Number,
    filhote: Boolean    
})

module.exports = Animais