const Database = require("../utils/database");


class PerfilModel {

    #id;
    #descricao;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    constructor(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    async listar() {
        let sql = "select * from tb_perfil";

        let banco = new Database();
        let lista = [];
        let rows = await banco.ExecutaComando(sql);
        for(let i = 0; i<rows.length; i++) {
            lista.push(new PerfilModel(rows[i]["per_id"],
                rows[i]["per_descricao"]
            ))
        }

        return lista;
    }
}

module.exports = PerfilModel;