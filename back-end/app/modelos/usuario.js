const mongoose = require('mongoose')
const gpsModelo = require('./gps')

const SchemaUsuario = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: [true, 'O Nome de usuário é obrigatório.']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'O email de usuário é obrigatório.']
    },
    nascimento: {
        type: Date,
        required: [true, 'A data de nascimento de usuário é obrigatório.']
    },
    telefone: {
        type: String,
        trim: true,
        required: [true, 'O telefone de usuário é obrigatório.']
    },
    gps: [gpsModelo.schema],
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Usuario', SchemaUsuario)