const express = require("express");
const UsuarioController = require("../controller/usuarioController");

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listarView);

module.exports = router;