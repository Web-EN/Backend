// Este file es para agregar cuentas en la base de datos
const bcrypt = require('bcryptjs');
const {Pool} = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    database: 'weben', // weben
    password: process.env.PASSWORD,
    port: 5432,
});


const createUser = async (name, type) => {
    // Pon la contraseña en pass
    let pass = '123';
    let hashed_pass = '';
    let salt = '';
    const client = await pool.connect();
    try {
        // hashed_pass = await bcrypt.hash(pass, 10);
        // console.log(hashed_pass);
        salt = await bcrypt.genSalt(10);
        hashed_pass = await bcrypt.hash(pass, salt);
        const query_user = {
            text: 'INSERT INTO public."Usuarios"(usuario, hashed_pass, rol_id, sal) VALUES($1, $2, $3, $4)',
            // Si quieres que sea un profesor, cambia el 1 por 2
            // Si quieres que sea un tutor, cambia el 1 por 4
            // Si quieres que sea un estudiante, cambia el 1 por 3
            values: [name, hashed_pass, type, salt],
        }
        await client.query(query_user);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        client.release();
    }
};

for(i = 0; i<4; i++){
    newName = `tutor${i}`;
    createUser(newName, 4);
}

