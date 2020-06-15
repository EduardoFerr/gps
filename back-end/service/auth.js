const jwt = require('jsonwebtoken')
const { promisify } = require("util")

exports.auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // var decoded = jwt.decode(authHeader, { complete: true });
    // console.log('/n/ndecoded.header')
    // console.log(decoded.header)
    // console.log('/n/ndecoded.payload')
    // console.log(decoded.payload)
    try {
        if (!authHeader) {
            //throw error;
            res.status(401).send({ error: "Usuário não possui um token válido para acesso!" })
        }
        const decodedCallback = await jwt.verify(authHeader, req.app.get('chave'))
        if (!decodedCallback) {
            res.json({ success: false, message: 'Falha ao autenticar o token.' });
        }
        req.decoded = decodedCallback
        req.usuario = decodedCallback.usuario
    } catch (err) {
        res.status(401).send({ error: "Token inválido" })
        next(err)
    }
    next()

}
