const { Router } = require("express");
const router = Router();

//Controladores
const { genToken, isAuth , isAuth2 } = require("../Controllers/cooky.controller");

//cooky
router.get("/cooky", genToken);

module.exports = router