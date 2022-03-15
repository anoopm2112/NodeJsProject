const mongoose = require('mongoose');

const NotesScheme = mongoose.Schema({
    id: String,
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Notes', NotesScheme);