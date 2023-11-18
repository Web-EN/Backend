const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// No es necesario crear una instancia de cliente aquí

// Para consulta
async function getUserFromDatabase(username, password, client) {
  try {
    // Realizar una consulta SQL para verificar las credenciales
    const query = {
      text: 'SELECT usuario, hashed_pass FROM public."Usuarios" WHERE usuario = $1 AND hashed_pass = $2',
      values: [username, password],
    };

    const result = await client.query(query);
    console.log(result.rows);

    if (result.rows.length === 1) {
      const user = result.rows[0];
      return {
        id: user.id,
        username: user.username,
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