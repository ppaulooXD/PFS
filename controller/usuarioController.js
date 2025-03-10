const UsuarioModel = require("../models/usuarioModel");

class UsuarioController {

    async listarView(req, res) {
        let model = new UsuarioModel();
        let listaUsuarios = await model.listar();
        res.render('usuarios/listar.ejs', {usuarios: listaUsuarios});
    }
}

module.exports = UsuarioController;