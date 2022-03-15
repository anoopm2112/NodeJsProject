const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.password) {
        return res.status(400).send({
            message: "User password can not be empty"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a New User
    const user = new User({
        id: Math.random().toString(26).slice(2),
        name: req.body.name,
        email: req.body.email || "email@gmail.com",
        password: hashPassword
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.login = async (req, res) => {
    const dbUser = await User.findOne({ email: req.body.email });

    // Comparing typed password with DB user password
    const validatePassword = await bcrypt.compare(req.body.password, dbUser.password)
    if (validatePassword) {
        // Create and assign a token
        const token = jwt.sign({ _id: dbUser._id, email: dbUser.email }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ success: 1, token: token, user: dbUser });
        res.send(dbUser);
    } else {
        res.status(400).send('Password does not match');
    }
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            let response = {
                success: 1,
                message: 'Users fetched successfully',
                users: users
            };
            res.send(response);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findOneAndDelete(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findOneAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled User",
        email: req.body.email,
        password: req.body.password
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};