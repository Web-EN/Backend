// Este file es para agregar cuentas en la base de datos
const { Client } = require("pg");
require('dotenv').config();
const bcrypt = require('bcryptjs');

const client = new Client({
    user: 'postgres',
    host: process.env.HOST,
    database: 'weben', // weben
    password: process.env.PASSWORD,
    port: 5432,
});

// Pon la contraseña en pass
let pass = '123';
let hashed_pass = '';
let salt = '';

(async () => {
    try {
        await client.connect();
        // hashed_pass = await bcrypt.hash(pass, 10);
        // console.log(hashed_pass);
        salt = await bcrypt.genSalt(10);
        hashed_pass = await bcrypt.hash(pass, salt);
        const query_user = {
            text: 'INSERT INTO public."Usuarios"(usuario, hashed_pass, rol_id, sal) VALUES($1, $2, $3, $4)',
            // Si quieres que sea un profesor, cambia el 1 por 2
            // Si quieres que sea un tutor, cambia el 1 por 4
            // Si quieres que sea un estudiante, cambia el 1 por 3
            values: ['admin', hashed_pass, 1, salt],
        }
        await client.query(query_user);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.end();
    }
})();

