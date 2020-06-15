const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const gpsModelo = require('./gps')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const saltRounds = 10

const required = [true, 'O campo: {PATH}; é obrigatório.']
const unique = [true, 'O {VALUE} já está registrado.']

const SchemaUsuario = new mongoose.Schema({
    usuario: {
        index: true,
        type: String,
        required: required,
        trim: true,
        unique: unique,
        maxlength: 50,
        uniqueCaseInsensitive: true
    },
    nome: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /[A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ'-][a-záéíóúàâêôãõüç'-].* [A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ'-][a-záéíóúàâêôãõüç'-].*/.test(v)
            },
            message: props => `'${props.value}' não é um nome válido!`
        },
        required: required
    },
    email: {
        type: String,
        trim: true,
        maxlength: 100,
        required: required,
        unique: unique,
        uniqueCaseInsensitive: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: required,
    },
    nascimento: {
        type: Date,
        required: required,
    },
    telefone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /(\(\d{2}\)) (\d{8,9})/.test(v)
            },
            message: props => `'${props.value}' não é um telefone válido!`
        },
        required: required,
        unique: unique,
    },
    whatsapp: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return new Promise((resolve, reject) => {
                    resolve(/(\d{2})(\d{8})/.test(v))
                })
            },
            message: props => `'${props.value}' não é um número de telefone válido!`
        },
        required: required,
    },
    sexo: {
        type: String,
        enum: {
            values: ['Masculino', 'Feminino'], message: props => `'${props.value}' não é um valor válido para o campo sexo!`
        },
        required: required,
    },
    cidade: {
        type: String,
        required: required,
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
SchemaUsuario.pre('save', async function (next) {
    console.log('usuario modelo PRE')
    console.log(this)
    console.log('usuario modelo PRE!!')

    if (!this.isModified("password")) next()
    this.password = await bcrypt.hashSync(this.password, saltRounds)
    next()
})

SchemaUsuario.plugin(uniqueValidator, {
    message: 'Ops, o {PATH} já está sendo utilizado.',
    _message: 'Erro ao validar usuário.'
})

SchemaUsuario.methods = {
    compareHash(hash) {
        const { password } = this
        if (hash && password) {
            return bcrypt.compareSync(hash, password)
        } else {
            return false
        }
    },

    generateToken(chave) {
        return jwt.sign({ usuario: this.usuario }, chave, {
            expiresIn: 86400
        })
    },

    getIdByToken(hash) {
        console.log('hash')
        console.log(hash)
        // const { id } = this
        // if (hash && id) {
            
        //     console.log(bcrypt.compareSync(hash, id))
        // } else {
        //     console.log(false)
        // }
    }
}

module.exports = mongoose.model('Usuario', SchemaUsuario)