const app = require('express').Router();
const user = require('../controllers/user.contollers');

app.post('/register', user.create); // Register a new User
app.post('/login', user.login); // Login a User
// app.put('/userId', user.update); // Update a User
app.delete('/:userId', user.delete); // Delete a User with userId

module.exports = app;