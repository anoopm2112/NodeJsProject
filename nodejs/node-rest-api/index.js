const express = require('express');
const app = express();
const empRouter = require('./routes/employee.route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
//mongoose
mongoose.connect('mongodb+srv://gopu11:TDGAEK9tm7Ao1ZtK@cluster0.col1y.mongodb.net/employee_db?retryWrites=true&w=majority')
    .then((res) => {
        console.log('database is connected successfully')
    }).catch((err) => {
        console.log('oops something went wrong while connecting' + err)
    })


app.use('/api/emp', empRouter)
app.listen(4000, () => {
    console.log('server is listening on port 4000...')
})