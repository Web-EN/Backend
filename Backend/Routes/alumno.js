const { Router } = require("express");
const router = Router();

//Controladores
const { getAlumnos,} = require("../Controllers/alumno.controller");

//cooky
router.get("/alumno", getAlumnos);

module.exports = router