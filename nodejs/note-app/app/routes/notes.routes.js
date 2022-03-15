const app = require('express').Router();
const notes = require('../controllers/notes.controller');

app.post('/createNote', notes.create); // Create a new Note
app.get('/notes', notes.findAll); // findAll a Note with noteId
app.get('/:noteId', notes.findOne); // Find a Note with noteId
app.put('/:noteId', notes.update); // Edit a Note with noteId
app.delete('/:noteId', notes.delete); // Delete a Note with noteId

module.exports = app;