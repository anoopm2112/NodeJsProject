const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');
const _ = require('lodash');
const cheerio = require('cheerio');
const axios = require('axios');

//Create new user
exports.create = async (req, res) => {

    // Validate request
    // if (!req.body.password) {
    //     return res.status(400).send({
    //         message: "User password can not be empty"
    //     });
    // }

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // const user = new User({
    //     id: Math.random().toString(26).slice(2),
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashPassword
    // });

    // user.save().then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the User."
    //     });
    // });


    const request = require("request-promise")
    const cheerio = require("cheerio");

    request("https://www.mathrubhumi.com/videos", (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            // const datarow = $(".HeaderRow");
            const dataData = [];
            $(".item2").each((i, data) => {
                var title = $(data).find('.sp_story_title').text();
                var image = $(data).find('src').text();
                var item = $(data).find('.p').text();
                dataData.push({ news: title, img: item})
                // const item = $(data).text();
                // const item1 = $(data).text();
                // const item2 = $(data).text();
            })

            res.send(dataData)
        }
    });
};

//Login a user
exports.login = async (req, res) => {
    const dbUser = await User.findOne({ email: req.body.email });

    const validatePassword = await bcrypt.compare(req.body.password, dbUser.password);
    if (validatePassword) {
        // Create token
        const token = jwt.sign({ _id: dbUser._id, email: dbUser.email }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ success: 1, token: token, user: dbUser });
        res.send(dbUser);
    } else {
        res.status(400).send('Password does not match');
    }
}

//Delete a User
exports.delete = (req, res) => {
    User.findByIdAndRemove({ _id: req.params.userId }).then(user => {
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
}