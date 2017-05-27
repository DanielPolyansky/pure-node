const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('server running on port ' + port);
});