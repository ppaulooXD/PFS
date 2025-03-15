const express = require("express");
const UsuarioController = require("../controller/usuarioController");

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listarView);
router.get("/cadastro", ctrl.cadastrarView);

module.exports = router;