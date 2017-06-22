const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('Message', new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: number,
        required: true,
    },
    password: {
        userPic: String,
        required: true
    }
}));