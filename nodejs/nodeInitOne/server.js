const dotEnv = require('dotenv')
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
dotEnv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(cors()) // Use this after the variable declaration

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 50002 - Main");
});

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useUnifiedTopology: true,  useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});