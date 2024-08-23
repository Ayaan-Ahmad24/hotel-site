const { employeeRegister } = require('../controller/registerEmployee.controller')
const express = require('express')
const router = express.Router()

router.get('/employeeregister', (req, res) => {
    res.status(200).send('Hello from Employee page')
})
router.post('/employeeregister', employeeRegister)

module.exports = router