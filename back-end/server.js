require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./config/database')
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const cors = require('cors')
const {hidePoweredBy, noSniff, xssFilter} = require('helmet')

app.use(hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(noSniff())
app.use(xssFilter())
app.use(cors())
app.use(express.json())
app.use('/api', routes)

db.then(
    (conexao) => {
        console.log(`Estado do banco de dados: ${conexao.states[conexao.readyState]}`)
        app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}!`))
    }
).catch(err => console.log(err))
