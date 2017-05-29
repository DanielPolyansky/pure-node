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
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use('/', router);

app.listen(port, () => {
    console.log('server running on port ' + port);
});