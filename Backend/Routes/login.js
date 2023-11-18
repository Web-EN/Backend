const { Router } = require("express");
const router = Router();

//Controladores
const { verifyLogin } = require("../Controllers/login.controller");
const { genToken, isAuth , isAuth2 } = require("../Controllers/cooky.controller");
//Login
router.post("/login", verifyLogin);

const GetUsers = async (req, res) => {
  const response = await pool.query('Select * FROM users');
  res.status(200).json(response.rows)
};

const GetUserByID = async (req, res) => {
  const id = req.params.id;
 const response = pool.query('SELECT * FROM users WHERE id = $1', [id])
 res.json(response.rows)
}

const CreateUser = async (req, res) => {
  const { name, lastname } = req.body;
  const response = await pool.query('INSERT INTO users (name, lastname) VALUES ($1, $2)', [name, lastname])
  res.send('user created');
}

const UpDateUser = async (req, res) => {
  const id = req.params.id
  const {name, lastname} = req.body
  const response = await pool.query('UPDATE users SET name = $1, lastname = $2, id = $3',[
    name,
    lastname,
    id
  ])
  console.log(response)
  res.json('User updated');
}

const DeleteUser = async (req, res) => {
  const id = req.params.id
  const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log(response);
  res.json(`User ${id} deleted`);
}

module.exports = router
