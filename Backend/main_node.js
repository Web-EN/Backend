//Importaciones
const session = require('express-session');
const express = require('express');
const pgSession = require('connect-pg-simple')(session);
const pg = require('pg');
require('dotenv').config();

//Inicializaciones
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// Permite todos las peticiones CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Cambiar esta dirección de ser necesario
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Cookies
const pgPool = new pg.Pool({
  user: 'postgres',
  host: process.env.HOST,
  database: 'weben',
  password: process.env.PASSWORD,
  port: 5432,
});

pgStoreConfig = {
  pgPool: pgPool,
};

app.use(session({
    store: new pgSession({
      pool : pgPool,
      tableName : 'user_sessions'
    }),
    secret: process.env.jwt_secret_mail,
    resave: false,
    cookie: { maxAge: 10*60*1000 },
    saveUninitialized: false,
    secure: true,
}));

//Rutas
app.get("/",(req, res) => {
  res.send("Hello");
}); //No lo borren xd
app.use(require("./Routes/login"));
app.use(require("./Routes/director"));
app.use(require("./Routes/upload"));
app.use(require("./Routes/cooky"));
app.use(require("./Routes/alumno"))

app.listen(PORT, () =>{
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});