const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

routes.get('/home', (req, res, next) => {
    res.redirect('/');
});
routes.get('/chat', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/chat.html'));
});

routes.get('/auth', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/auth.html'));
});

routes.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/login.html'));
});

module.exports = routes;