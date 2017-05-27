const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./api/routes');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

app.listen(port, () => {
    console.log('server running on port ' + port);
});