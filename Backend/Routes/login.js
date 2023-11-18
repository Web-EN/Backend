const { Router } = require("express");
const router = Router();

//Controladores
const { verifyLogin } = require("../Controllers/login.controller");
const { genToken, isAuth , isAuth2 } = require("../Controllers/cooky.controller");
//Login
router.post("/login", verifyLogin);

module.exports = router
