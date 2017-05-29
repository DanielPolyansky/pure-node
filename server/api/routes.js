const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});
router.get('/home', (req, res, next) => {
    res.redirect('/');
});
router.get('/auth', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/auth.html'));
});
router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/login.html'));
});

router.get('/api', (req, res, next) => {
    res.send('API');
});

router.get('/api/authenticate', (req, res, next) => {
    res.send('API/authenticate');
});

router.get('/api/user', (req, res, next) => {
    res.send('API/user');
});
module.exports = router;