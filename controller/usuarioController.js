const PerfilModel = require("../models/perfilModel");
const UsuarioModel = require("../models/usuarioModel");

class UsuarioController {

    async listarView(req, res) {
        let model = new UsuarioModel();
        let listaUsuarios = await model.listar();
        res.render('usuarios/listar.ejs', {usuarios: listaUsuarios});
    }

    async cadastrarView(req, res) {
        let perfil = new PerfilModel();
        let listaPerfil = await perfil.listar();
        res.render('usuarios/cadastro.ejs', {listaP: listaPerfil});
    }
}

module.exports = UsuarioController;