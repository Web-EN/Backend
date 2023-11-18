const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
// No es necesario crear una instancia de cliente aquí

// Para consulta
async function getUserFromDatabase(username, password, client) {
  try {
    const query_salt = {
      text: 'SELECT sal FROM public."Usuarios" WHERE usuario = $1',
      values: [username],
    };

    const sal = await client.query(query_salt);
    const hashed_pass = await bcrypt.hash(password, sal.rows[0]['sal']);

    const query = {
      text: 'SELECT usuario, rol_id FROM public."Usuarios" WHERE usuario = $1 AND hashed_pass = $2',
      values: [username, hashed_pass],
    };
    const result = await client.query(query);

    if (result.rows.length === 1) {
      const user = result.rows[0];
      console.log(user.rol_id, user.usuario);
      return {
        id: user.rol_id,
        username: user.usuario,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

// Para generar token
function generateAuthToken(user) {
  const secretKey = crypto.randomBytes(32).toString('hex');

  // Solo define el token
  const payload = {
    userId: user.id,
    username: user.username,
    // Se pueden incluir más datos
  };

  // Genera el token JWT con la información y la clave secreta
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = { getUserFromDatabase, generateAuthToken };