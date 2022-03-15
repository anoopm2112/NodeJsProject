module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/register', user.create); // Register a new User
    app.post('/login', user.login); // Login user
    app.get('/users', user.findAll); // Retrieve all Users
    app.delete('/users/delete/:userId', user.delete); // Delete a User with userId
    app.put('/users/:userId', user.update); // Update a User with userId
}