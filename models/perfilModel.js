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

    teste() {

    }
}

module.exports = PerfilModel;