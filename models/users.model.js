const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },

});
module.exports = model('users', userSchema);