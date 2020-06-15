const gpsModelo = require('../modelos/gps')

exports.pegarGps = async (req, res, next) => {
    const gps = await res.usuario.gps.id(req.params.id_gps)
    try {
        if (gps == null)
            return res.status(404).json({
                mensagem: 'Gps não encontrado.'
            })
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar gps'
        })
    }
    res.gps = gps
    next()
}

exports.listar = async (req, res) => {
    try {
        const gps = await res.usuario.gps
        res.json({
            mensagem: `${gps.length} registro(s) encontrado(s).`,
            data: gps
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu enquanto listava gps"
        })
    }
}

exports.buscar = async (req, res) => {
    res.json(res.gps)
}

exports.adicionar = async (req, res) => {
    const authUser = req.headers.user
    const gps = new gpsModelo(req.body)

    try {
        res.usuario.gps.push(gps)
        const callback = await res.usuario.save()
        res.status(201).json({
            mensagem: 'Adicionado novo gps',
            data: callback
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu na busca gps"
        })
    }
}

exports.atualizar = async (req, res) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            res.gps[key] = req.body[key]
        }
    }

    try {
        const usuario = await res.usuario.save()
        res.status(204) .end()
    } catch (error) {
                
                            res.status(400).json({
            mensagem    : error.message || error.statusText || "Alguma coisa aconteceu ao tentar atualizar gps"
        })
    }
}

exports.deletar = async (req, res) => {
    const gps = res.usuario.gps.pull(res.gps.id)
    try {
        const callback = await res.usuario.save()
        res.json({
            mensagem: 'gps deletado.',
            data: callback
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar deletar Gps"
        })
    }
}
