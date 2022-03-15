const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserScheme);