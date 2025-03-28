const Database = require("../utils/database");


class UsuarioModel {

    #id;
    #nome;
    #email;
    #senha;
    #ativo;
    #perfilId;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }
    set senha(value) {
        this.#senha = value;
    }

    get ativo() {
        return this.#ativo;
    }
    set ativo(value) {
        this.#ativo = value;
    }

    get perfilId() {
        return this.#perfilId;
    }
    set perfilId(value) {
        this.#perfilId = value;
    }

    constructor(id, nome, email, senha, ativo, perfilId) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#ativo = ativo;
        this.#perfilId = perfilId;
    }

    async gravar() {
        let sql = `insert into tb_usuario 
                        (usu_nome, usu_email, usu_senha, usu_ativo, per_id)
                   values 
                        (?, ?, ?, ?, ?)`;
        let valores = [this.#nome, this.#email, this.#senha, this.#ativo, this.#perfilId]
        let banco = new Database();
        let resultado = await banco.ExecutaComandoNonQuery(sql, valores);

        return resultado;
    }

    async obter(id) {

        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];
        let banco = new Database();
        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {

            lista.push(new UsuarioModel(rows[i]["usu_id"], 
                                        rows[i]["usu_nome"],
                                        rows[i]["usu_email"],
                                        rows[i]["usu_senha"],
                                        rows[i]["usu_ativo"],
                                        rows[i]["per_id"]));
        }

        return lista;

    }

    async listar() {

        let sql = "select * from tb_usuario";
        let banco = new Database();
        let lista = [];
        let rows = await banco.ExecutaComando(sql);
        for(let i = 0; i < rows.length; i++) {

            lista.push(new UsuarioModel(rows[i]["usu_id"], 
                                        rows[i]["usu_nome"],
                                        rows[i]["usu_email"],
                                        rows[i]["usu_senha"],
                                        rows[i]["usu_ativo"],
                                        rows[i]["per_id"]));
        }

        return lista;
    }

    async listaAutenticacao(email, senha) {

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ? and usu_ativo = 1";
        let banco = new Database();
        let valores = [email, senha]
        let lista = [];
        let rows = await banco.ExecutaComando(sql, valores);
        for(let i = 0; i < rows.length; i++) {

            lista.push(new UsuarioModel(rows[i]["usu_id"], 
                                        rows[i]["usu_nome"],
                                        rows[i]["usu_email"],
                                        rows[i]["usu_senha"],
                                        rows[i]["usu_ativo"],
                                        rows[i]["per_id"]));
        }

        return lista;
    }

    async excluir(id) {
        let sql = "delete from tb_usuario where usu_id = ?";
        let banco = new Database();
        const valores = [id];
        const resultado = banco.ExecutaComandoNonQuery(sql, valores);
        
        return resultado;
    }

    async alterar() {
        let sql = `UPDATE tb_usuario
               SET usu_nome = ?, usu_email = ?, usu_senha = ?, usu_ativo = ?, per_id = ?
               WHERE usu_id = ?`;
        let valores = [this.#nome, this.#email, this.#senha, this.#ativo, this.#perfilId, this.#id];
        let banco = new Database();
        let resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
}

}

module.exports = UsuarioModel;