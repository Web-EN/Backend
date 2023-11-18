require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: 'weben',
    port: 5432,

    //host: 'localhost',
    //password: '',
});

const getAlumnos = async(req, res)=>{
    try {
        const response = await pool.query('SELECT * FROM public."Alumno" WHERE ');
        res.send(response.rows);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAlumnos,

}