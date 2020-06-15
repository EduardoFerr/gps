const usuarioModelo = require('../modelos/usuario')

function desestruturarPerfilUsuario({ nome, usuario, email, idade, nascimento, telefone, whatsapp, sexo, uf, gps }) {
    return { nome, usuario, email, idade, nascimento, telefone, whatsapp, sexo, uf, gps }
}


exports.registrar = async (req, res, next) => {
    const usuario = new usuarioModelo(req.body)
    try {
        const novoUsuario = await usuarioModelo.create(usuario)
        res.json({
            mensagem: `${novoUsuario.usuario} registrado com sucesso!`,
            data: novoUsuario
        })
    } catch ({ errors }) {
        return res.status(500).json({
            status: "error",
            message: "Ocorreu um problema ao tentar registrar o novo usuário. Tente novamente.",
            data: errors
        })
    }
}

exports.autenticar = async (req, res, next) => {
    const { usuario, password } = req.body
    const usuarioAuth = await usuarioModelo.findOne({ usuario })

    try {
        if (!usuarioAuth) {
            res.status(400).json({ error: "Usuário ou Senha não conferem." });
        }
        if (!(usuarioAuth.compareHash(password))) {
            res.status(400).json({ error: "Usuário ou Senha inválido(s)." })
        } else {
            res.json({
                usuario: desestruturarPerfilUsuario(usuarioAuth),
                token: usuarioAuth.generateToken(req.app.get('chave'))
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message || error.statusText || "Ocorreu um problema ao tentar validar o usuário. Tente novamente.",
            data: null
        })
    }
}
//"Rota" para o perfil de usuário
exports.usuario = async (req, res, next) => {
    if (req.usuario !== req.query.u)
        res.status(400).json('😡 Requisição ruim!')

    const usuario = desestruturarPerfilUsuario(await usuarioModelo.findOne({ 'usuario': req.usuario }))

    try {
        if ((!usuario))
            res.status(404).json({
                mensagem: 'Perfil de usuário não encontrado'
            })

        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar usuário'
        })
    } finally {
        res.usuario = usuario
        next()
    }

}


exports.pegarUsuario = async (req, res, next) => {
    console.log('req.headers')
    console.log(req.headers)
    console.log('req.params')
    console.log(req.params)

    const usuario = await usuarioModelo.findOne({ usuario: req.params.usuario })
    // usuario.getIdByToken(req.headers)
    try {
        if (usuario == null)
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            })
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar usuário.'
        })
    } finally {
        res.usuario = desestruturarPerfilUsuario(usuario)
        next()
    }
}



exports.listar = async (req, res) => {
    try {
        const usuario = await usuarioModelo.find()
        res.json({
            mensagem: `${usuario.length} registro(s) encontrado(s).`,
            data: usuario
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu enquanto listava usuário"
        })
    }
}

exports.buscar = async (req, res) => {
    res.json(res.usuario)
}

exports.adicionar = async (req, res) => {
    const usuario = new usuarioModelo(req.body)
    try {
        const novoUsuario = await usuario.save()
        res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            data: novoUsuario
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            error._message = 'Erro de validação de usuário.'
        }
        res.status(400).json({
            mensagem: "Alguma coisa aconteceu ao tentar adicionar o usuário",
            alerta: error._message || error.message || error.statusText,
            erro: error
        })
    }
}

exports.atualizar = async (req, res) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            (typeof res.usuario[key] === 'object') ?
                res.usuario[key].push(req.body[key]) :
                res.usuario[key] = req.body[key]
        }
    }

    try {
        const usuario = await res.usuario.save()
        res.json(usuario)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar atualizar usuário"
        })
    }

}

exports.deletar = async (req, res) => {
    try {
        await res.usuario.remove()
        res.json({
            mensagem: 'usuário deletado.'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar deletar usuário"
        })
    }
}