require('dotenv').config();
const { Client } = require("pg");
const session = require('express-session');
const express = require('express');
const { getUserFromDatabase} = require('../auth');

const verifyLogin = async (req, res) => {
    const { username, password } = req.body;
    const client = new Client({
        user: 'postgres',
        host: process.env.HOST,
        database: 'weben',
        password: process.env.PASSWORD,
        port: 5432,
    });
    try {
        await client.connect();
        const user = await getUserFromDatabase(username, password, client);
        if (user) {
            req.session.isAuth = true;
            res.status(200).json({
            user,
            sessionId: req.session.id,
        });
        } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: "Error en el servidor" });
    } finally {
        if (client._connected) {
            await client.end();
            console.log('Cliente desconectado');
        }
    }
};

module.exports = {
    verifyLogin,
}