const { Router } = require("express");
const router = Router();
const multer = require('multer');

const { uploadFile } = require("../Controllers/upload.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads') //Carpeta uploads
    },
    filename: function (req, file, cb) {
        // console.log(file)
        cb(null, `${Date.now()}-${file.originalname}`); //Date.now() para prevenir el reemplazo del archivo por el mismo nombre
    }
});

const upload = multer({ storage: storage });

// Rutas relacionadas al envio de archivos (pueden reutilizarlo si van a usar la misma carpeta de uploads, pero con diferente ruta )
router.post("/director/documentos", upload.single('testFile'), uploadFile);

module.exports = router;