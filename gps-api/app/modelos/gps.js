const mongoose = require('mongoose')

const SchemaGps = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: [true, 'O Nome é obrigatório.']
    },
    idade: {
        type: Number,
        required: [true, 'A idade é obrigatória.']
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        required: [true, 'O gênero é obrigatório.']
    },
    orientacao: {
        type: String,
        enum: ['Hetero', 'Bisexual', 'Homosexual'],
        required: [true, 'A orientação é obrigatório.']
    },
})

module.exports = mongoose.model('Gps', SchemaGps)