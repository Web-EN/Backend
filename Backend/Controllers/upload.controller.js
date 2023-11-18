require('dotenv').config();
const multer = require('multer');
const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    database: 'weben',
    password: process.env.PASSWORD,
    port: 5432,

    //Test
    // host: 'localhost',
    // password: '',
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //Previene que un archivo del mismo nombre se reemplace
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Por favor, seleccione un archivo');
        error.httpStatusCode = 400;
        return next(error);
    }
    //exports.upload = upload.single('testFile');
    const nombre = file.originalname;
    const ruta_archivo = req.file.path;
    pool.query('INSERT INTO public."Documento" ("nombre", "ruta_archivo") VALUES ($1, $2)', [nombre, ruta_archivo], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`Documento subido con éxito`);
    })
} // Usar Postman o Thunder Client

module.exports = {
    uploadFile
}