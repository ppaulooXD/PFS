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
           res.send({
            ok: false,
            msg: "As informações do usuário estão incorretas!"
           }) 
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        const usuario = new UsuarioModel();
        const resultado = await usuario.excluir(id);
        let msg = "";
        if(resultado) {
            msg = "Usuário excluído com sucesso!"
        }
        else {
            msg = "Não foi possível excluir o Usuário!"
        }
        res.json({
            ok:resultado,
            msg:msg
        })

    }

    async alterarView(req, res) {
        const id = req.params.id;
        const usuario = new UsuarioModel();
        const usuarioAlteracao = await usuario.obter(id);

        if (usuarioAlteracao.length > 0) {
            let perfil = new PerfilModel();
            let listaPerfil = await perfil.listar();
            res.render('usuarios/cadastro.ejs', { usuarioAlteracao: usuarioAlteracao[0], listaP: listaPerfil });
        } else {
            res.send({ ok: false, msg: "Usuário não encontrado!" });
        }
    }

async alterar(req, res) {
    if (req.body.nome !== "" && req.body.email !== "" && req.body.senha !== "" && req.body.perfil !== "0") {
        let usuario = new UsuarioModel();
        usuario.id = req.body.id;
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;
        usuario.perfilId = req.body.perfil;
        usuario.ativo = req.body.ativo ? 1 : 0;

        let ok = await usuario.alterar();
        if (ok) {
            res.send({ ok: true, msg: "Usuário alterado com sucesso" });
        } else {
            res.send({ ok: false, msg: "Erro ao alterar o usuário!" });
        }
    } else {
        res.send({ ok: false, msg: "As informações do usuário estão incorretas!" });
    }
}
}

module.exports = UsuarioController;