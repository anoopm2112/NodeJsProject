const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 5
    },
    middleName: {
        type: String,
        required: true,
        min: 5
    },
    lastName: {
        type: String,
        required: true,
        min: 5
    },
    age: {
        type: Number,
        required: true,

    }
});



const model = mongoose.model('employee', employeeSchema);

module.exports = model