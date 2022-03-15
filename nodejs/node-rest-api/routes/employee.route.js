const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee.model')
const mongoose = require('mongoose');



router.post('/', async (req, res) => {
    try {
        console.log('body', req.body)
        let existingEmp = await employeeModel.findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            age: req.body.age
        })
        if (!existingEmp) {

            const employee = new employeeModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                middleName: req.body.middleName,
                age: req.body.age
            });
            let data = await employee.save();
            res.json({
                success: 1,
                message: 'employee saved successfully',
                data: data
            })
        } else {
            res.json({
                success: 0,
                message: 'employee data already exist',
            })
        }
    } catch (error) {
        res.json({
            success: 0,
            message: 'something went wrong' + error
        })

    }
});

//get

router.get('/', async (req, res) => {
    try {
        let allEmployess = await employeeModel.find();
        res.json({
            success: 1,
            message: 'Employees listed successfully',
            items: allEmployess
        })
    } catch (error) {
        res.json({
            success: 0,
            message: 'something went wrong while fetching list employees' + error,
        })


    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    var isValid = mongoose.Types.ObjectId.isValid(id)
    if (isValid) {
        try {
            let singleEmployee = await employeeModel.findById({ _id: id })

            res.json({
                success: 1,
                message: 'single Employee listed successfully',
                item: singleEmployee
            })

        } catch (error) {
            res.json({
                success: 0,
                message: 'something went wrong' + error,
            })
        }

    }
    else {
        res.json({
            success: 0,
            message: 'invalid id',
        })
    }
})

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    var isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
        try {
            let data = await employeeModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    middleName: req.body.middleName,
                    age: req.body.age
                },

            })
            res.json({
                success: 1,
                message: 'single Employee updated successfully',
                item: data,
                dataaa: dataaa
            })

        } catch (error) {
            res.json({
                success: 0,
                message: 'something went wrong while editing' + error,
            })
        }
    } else {
        res.json({
            success: 0,
            message: 'invalid id',
        })
    }
})

//delete
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {

        await employeeModel.deleteOne({ id: id })
        res.json({
            success: 1,
            message: 'employee deleted successfully'
        })
    } catch (error) {
        res.json({
            success: 0,
            message: 'something went wrong' + error
        })

    }

})

module.exports = router