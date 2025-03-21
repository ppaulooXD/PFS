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

    async cadastrar(req, res) {
        if(req.body.nome != "" && req.body.email != "" &&
            req.body.senha != "" && req.body.perfil != "0") {
            //prosseguir com o cadastro
            let usuario = new UsuarioModel();
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.senha = req.body.senha;
            usuario.perfilId = req.body.perfil;
            usuario.ativo = req.body.ativo;
            let ok = await usuario.gravar(); 
            if(ok) {
                res.send({ok: true, msg: "Usuário cadastrado com sucesso"});
            }
            else {
                res.send({ok: false, msg: "Erro ao inserir o usuário no banco de dados!"});
            }   
        }
        else {
           //retornar erro por conta da validação!
           res.send({
            ok: false,
            msg: "As informações do usuário estão incorretas!"
           }) 
        }
    }
}

module.exports = UsuarioController;