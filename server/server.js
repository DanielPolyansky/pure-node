const express = require('express');
const app = express();
const port = require('../config').port;
const secret = require('../config').secret;
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const validator = require('express-validator');
const cors = require('cors');
const auth = require('./api/auth');
const mongoose = require('mongoose');
const database = require('../config').database;
const MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
let socket = require('socket.io');
let server = app.listen(port, () => {
    console.log('server is running on ' + port);
});
let io = socket(server);

/*MongoClient.connect(database, (err, db) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('DB successfuly connected!');
        db.close();
    }

});*/

mongoose.connect(database, (err) => {
    if (err) {
        console.log('Error while connecting to MLab');
    } else {
        console.log('DB connection established');
    }
});

app.set('superSecret', secret);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev'));
app.use('/', routes);
app.use('/api/', auth);

io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });

    socket.on('new_msg', (data) => {
        console.log(data);
        io.sockets.emit('new_income_msg', {
            message: data.message
        })
    });
});

exports.modules = app;