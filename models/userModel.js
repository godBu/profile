//const mongoose = require('mongoose');

//const UserSchema = new mongoose.Schema

const {Schema, model} = require('mongoose');

let user = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
}, {
    toObject: { // converts mongoose document to js
        virtuals: true
    }
});

module.exports = model('users', user);
