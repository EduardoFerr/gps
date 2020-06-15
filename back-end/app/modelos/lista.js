const mongoose = require('mongoose')
const gpsModelo = require('./gps')

const SchemaLista = new mongoose.Schema({
    id_gps: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: { createdAt: 'criado_em', updatedAt: 'atualizado_em' }
})

module.exports = mongoose.model('Lista', SchemaLista)