const PerfilModel = require("../models/perfilModel");

class LoginController{

    loginView(req, res){
        let perfil = new PerfilModel(20, "admin");
        console.log(perfil.id, perfil.descricao);
        res.render('login.ejs', {layout: false});
    }

    login(req,res){
        //post
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        let msg = "Usuário ou senha inválidos";
        let cor = "red";

        if (usuario === 'fulano@gmail.com' && senha==='123'){
            msg = "Login bem sucedido!";
            cor = "green";
        }

        res.render('login.ejs', {'mensagem':msg, 'color':cor, layout: false});
    }
}

module.exports = LoginController;