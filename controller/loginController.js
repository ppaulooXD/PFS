const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    async loginView(req, res) {
        res.render('login.ejs', { layout: false });
    }

    async login(req, res) {
        const { usuario, senha } = req.body;
        let msg = "Usuário ou senha inválidos";
        let cor = "red";

        let usuarioModel = new UsuarioModel();
        let usuarios = await usuarioModel.listaAutenticacao(usuario, senha);  

        let autenticado = false;

        for (let user of usuarios) {
            if (user.email === usuario && user.senha === senha && user.ativo) {
                autenticado = true;
                break; 
            }
        }

        if (autenticado) {
            msg = "Login bem sucedido!";
            cor = "green";
            return res.redirect('/');
        }

        res.render('login.ejs', { mensagem: msg, color: cor, layout: false });
    }
}

module.exports = LoginController;