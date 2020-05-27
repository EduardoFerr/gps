const mongoose = require('mongoose')
const gpsModelo = require('./gps')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const SchemaUsuario = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /[A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ'-][a-záéíóúàâêôãõüç'-].* [A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ'-][a-záéíóúàâêôãõüç'-].*/.test(v);
            },
            message: props => `'${props.value}' não é um nome válido!`
        },
        required: [true, 'O Nome de usuário é obrigatório.']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'O email de usuário é obrigatório.'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'A senha de usuário é obrigatória.']
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
                return /(\(\d{2}\)) (\d{8,9})/.test(v);
            },
            message: props => `'${props.value}' não é um telefone válido!`
        },
        required: [true, 'O telefone de usuário é obrigatório.'],
        unique: true,
    },
    whatsapp: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return new Promise((resolve, reject) => {
                    resolve(/(\d{2})(\d{8})/.test(v))
                });
            },
            message: props => `'${props.value}' não é um número de telefone válido!`
        },
        required: [false, 'O Whatsapp não é obrigatório, mas ajuda.']
    },
    sexo: {
        type: String,
        enum: {
            values: ['Masculino', 'Feminino'], message: props => `'${props.value}' não é um valor válido para o campo sexo!`
        },
        required: [true, 'O sexo de usuário é obrigatório.'],
    },
    cidade: {
        type: String,
        required: [true, 'A cidade de usuário é obrigatório.']
    },
    uf: {
        type: String,
        enum: { values: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'], message: props => `'${props.value}' não é um estado válido!` },
        required: [false, 'A unidade federativa (UF) de usuário é obrigatório.']
    },
    gps: [gpsModelo.schema],
},
    {
        timestamps: true
    })

// hash user password before saving into database
SchemaUsuario.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Usuario', SchemaUsuario)