const express = require("express");
const UsuarioController = require("../controller/usuarioController");

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listarView);
router.get("/cadastro", ctrl.cadastrarView);
router.post("/cadastro", ctrl.cadastrar);
router.get("/excluir/:id", ctrl.excluir);
router.get("/alterar/:id", ctrl.alterarView);
router.post("/alterar", ctrl.alterar); 

module.exports = router;