const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('User', new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        min: [5, 'Too short'],
        max: [15, 'Too long'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Too short'],
        max: [15, 'Too long']
    },
    friends: []
}));