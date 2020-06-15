const express = require('express')
const router = express.Router()

const { auth } = require('./service/auth')


const lista = require('./app/controladores/lista')
const usuario = require('./app/controladores/usuario')
const gps = require('./app/controladores/gps')


router.post('/registrar', usuario.registrar)
router.post('/autenticar', usuario.autenticar)
router.get('/perfil', auth, usuario.usuario)


router.get('/usuario', usuario.listar)
router.get('/usuario/:usuario', usuario.pegarUsuario, usuario.buscar)
router.post('/usuario', usuario.adicionar)
router.patch('/usuario/:id_usuario', usuario.pegarUsuario, usuario.atualizar)
router.delete('/usuario/:id_usuario', usuario.pegarUsuario, usuario.deletar)

router.get('/usuario/:id_usuario/gps', usuario.pegarUsuario, gps.listar)
router.get('/usuario/:id_usuario/gps/:id_gps', usuario.pegarUsuario, gps.pegarGps, gps.buscar)
router.post('/usuario/:id_usuario/gps', usuario.pegarUsuario, gps.adicionar)
router.patch('/usuario/:id_usuario/gps/:id_gps', usuario.pegarUsuario, gps.pegarGps, gps.atualizar)
router.delete('/usuario/:id_usuario/gps/:id_gps', usuario.pegarUsuario, gps.pegarGps, gps.deletar)


router.get('/lista', auth, lista.listar)
router.get('/lista/:id', lista.pegarLista, lista.buscar)
router.post('/lista', lista.adicionar)
router.patch('/lista/:id', lista.pegarLista, lista.atualizar)
router.delete('/lista/:id', lista.pegarLista, lista.deletar)

module.exports = router