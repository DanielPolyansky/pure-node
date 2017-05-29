const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new Schema({
    email: String,
    username: String,
    password: String
}));