const express = require("express");
const HomeController = require("../controller/homeController");

const router = express.Router();

let ctrl = new HomeController();
router.get("/", ctrl.home);
router.get("/contato", ctrl.contato);
router.get("/sobre", ctrl.sobre);

module.exports = router;