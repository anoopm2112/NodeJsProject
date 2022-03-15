module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Notes Routes
    app.post('/notes', notes.create); // Create a new Note
    app.get('/notes', notes.findAll); // Retrieve all Notes
    app.get('/notes/:noteId', notes.findOne); // Retrieve a single Note with noteId
    app.put('/notes/:noteId', notes.update); // Update a Note with noteId
    app.delete('/notes/:noteId', notes.delete); // Delete a Note with noteId
}