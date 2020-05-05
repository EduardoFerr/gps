const chalk = require('chalk');
const mongoose = require("mongoose");

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
const destacar = chalk.bgBlueBright;
const success = chalk.bold.greenBright;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => console.log(success("Configuração do BD realizada.")));

mongoose.connection.on('connected', () =>
    console.log(connected(`A conexão padrão está aberta para: ${db.host}`))
);

mongoose.connection.on('error', ({ message }) =>
    console.log(error(`Ocorreu um erro: ${message} na conexão padrão.`))
);

mongoose.connection.on('disconnected', () => {
    console.log(disconnected("A conexão padrão está desconectada."));
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(termination("A conexão padrão está desconectada devido ao encerramento do aplicativo"));
        process.exit(0)
    });
});

module.exports = db