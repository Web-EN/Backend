const { Router } = require("express");
const router = Router();

const { createAnuncio, getDocumentos, getProfesores, getAlumnos, getNotas, getPeriodoById, getPeriodosByMonth, createPeriodo } = require("../Controllers/director.controller");

router.post("/director/inicio", createAnuncio);
router.get("/director/documentos", getDocumentos);
router.get("/director/profesores", getProfesores);
router.get("/director/reporte", getNotas);
router.get("/director/alumnos", getAlumnos);
router.get("/director/calendario/:id", getPeriodoById);
router.get("/director/calendario/mes/:mes", getPeriodosByMonth);
router.post("/director/calendario", createPeriodo);

module.exports = router;