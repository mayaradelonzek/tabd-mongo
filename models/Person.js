const mongoose = require('mongoose')

const Person = mongoose.model('Pessoa', {    
    name: String,
    age: Number    
})

module.exports = Person