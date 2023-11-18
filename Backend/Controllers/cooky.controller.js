const session = require('express-session');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genToken = async (req, res) => {
  try{
    if(req){
      req.session.isAuth = true;
      console.log('session creada');
      console.log(req.session.id);
      // res.cookie('sessionID', req.session.id, {
      //    maxAge: 10*60*1000,
      // });
      res.send(req.session.id);
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
    // res.status(200).json({ message: 'everything is ok' });
  } catch (error){
    res.status(500).json({ message: error });
  }
};

const isAuth = async (req, res, next) => {
  if (req.session.isAuth){
    next();
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
};

const isAuth2 = async (req, res, next) => {
  if (req.session.isAuth){
    console.log('wut');
    res.send("no cookies");
  } else {
    next();
  }
};

module.exports = {
    genToken,
    isAuth,
    isAuth2,
}