const express = require('express');
const app = express();
const port = require('../config').port;
const secret = require('../config').secret;
const database = require('../config').database;
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./api/routes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const validator = require('express-validator');
const apiRoutes = require('express').Router();
mongoose.Promise = global.Promise;

mongoose.connect(database, (err) => {
    if (err) {
        console.log('Error while connecting to MLab');
    } else {
        console.log('DB connection established');
    }
})

app.set('superSecret', secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

apiRoutes.use(function(req, res, next) {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use('/', router);
app.use('/api', apiRoutes);
app.listen(port, () => {
    console.log('server running on port ' + port);
});

module.exports = app;