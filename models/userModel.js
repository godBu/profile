//const mongoose = require('mongoose');

//const UserSchema = new mongoose.Schema

const {Schema, model} = require('mongoose');

let user = new Schema({
    userName: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false},
}, {
    toObject: {
        virtuals: true
    }
});

module.exports = model('users', user);
