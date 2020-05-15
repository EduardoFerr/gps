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
        required: [true, 'O email de usuário é obrigatório.'],
        unique: true
    },
    nascimento: {
        type: Date,
        required: [true, 'A data de nascimento de usuário é obrigatório.']
    },
    telefone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `'${props.value}' não é um telefone válido!`
        },
        required: [true, 'O telefone de usuário é obrigatório.']
    },
    whatsapp: {
        type: String,
        trim: true,
        required: [false, 'O Whatsapp não é obrigatório, mas ajuda.']
    },
    sexo: {
        type: String,
        enum: { values: ['Masculino', 'Feminino'], message: props => `'${props.value}' não é um valor válido para o campo sexo!` },
        required: [true, 'O sexo de usuário é obrigatório.'],
    },
    cidade: {
        type: String,
        required: [true, 'A cidade de usuário é obrigatório.']
    },
    uf: {
        type: String,
        enum: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
        required: [false, 'A unidade federativa (UF) de usuário é obrigatório.']
    },
    gps: [gpsModelo.schema],
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Usuario', SchemaUsuario)