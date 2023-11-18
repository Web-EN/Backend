require('dotenv').config();
const { Pool } = require("pg");
const multer = require("multer");

const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: 'weben',
    port: 5432,

    //host: 'localhost',
    //password: '',
});

// 1) Menú (Director_inicio)
//  1.1) Mensajes y anuncios
const createAnuncio = async (req, res) => {
    const { contenido, fecha } = req.body;
    const response = await pool.query('INSERT INTO public."Anuncio" ("mensaje", "fecha") VALUES ($1, $2)', [contenido, fecha]);
    console.log(response);
    res.send("Anuncio creado");
}

//  1.2) Estado general
/*
    Agregar atributo de asistencia
*/

// 2) Menú (Director_Material)
//  2.1) Documentos ver
    const getDocumentos = async (req, res) => {
        const response = await pool.query('SELECT "nombre", "ruta_archivo" FROM public."Documento"');
        res.send(response);
        // Falta definir y mejorar esta parte

        // const documento = response.rows[0];
        // const nombre = documento.nombre;
        // const ruta_archivo = documento.nombre;
        // const archivo = fs.readFileSync(ruta_archivo);
        // res.send(archivo);
    }

//  2.2) Documentos subir
    // upload.js

// 3) Menú (Director_Profesor) > HECHO
const getProfesores = async (req, res) => {
    const response = await pool.query('SELECT "Nombres", "Apellidos" FROM public."Profesores"');
    //console.log(response.rows)
    //res.send("Get Alumnos (profesores)")
    res.status(200).json(response.rows);
};

// 4) Menú (Director_Reporte y registro)
const getNotas = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."Notas"');
    res.status(200).json(response.rows);
    // Falta relacionarlo con el salón
    // Supongo que en el frontend se realizará la operación del promedio de estas por salon, idk
};

// 5) Menú (Director_Análisis del alumno)
const getAlumnos = async (req, res) => {
    const response = await pool.query('SELECT "Nombres", "Apellido Paterno", "Apellido Materno" FROM public."Alumno"');
    res.status(200).json(response.rows);
}

// 6) Director_Calendario escolar // agregar y ver fechas

const getPeriodosByMonth = async (req, res) => {
    const mes = req.params.mes;
    const response = await pool.query('SELECT "periodo" FROM public."Periodos" WHERE EXTRACT (MONTH FROM "comienzo") = $1', [mes]); // Falta consistenciarlo para que no se repitan de diferentes años. Y mejorarlo
    res.status(200).json(response.rows);
}

const getPeriodoById = async (req, res) => { //Obtener 1 periodo
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM public."Periodos" WHERE "id" = $1', [id]);

    res.status(200).json(response.rows);
}

const createPeriodo = async (req, res) => {
    const { anio, nombrePeriodo, inicio, fin } = req.body;
    const response = await pool.query('INSERT INTO public."Periodos" ("a¤o_id", "periodo", "comienzo", "finalizacion") VALUES ($1, $2, $3, $4)', [anio, nombrePeriodo, inicio, fin]);
    console.log(response);
    res.send("Periodo-Evento creado");
}


module.exports = {
    createAnuncio,
    getDocumentos,
    getProfesores,
    getNotas,
    getAlumnos,
    getPeriodosByMonth,
    getPeriodoById,
    createPeriodo
}