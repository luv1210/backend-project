const express = require('express')
const { verifytoken } = require('../middleware/verifytoken')
const { authorizeRoles } = require('../middleware/authorizeRoles ')
const { getAllEmployee, deleteEmployee, updateEmployee } = require('../controller/employee.controller')
const routes = express.Router()


routes.get('/get-allemployee',authorizeRoles('admin','manager','employee'),getAllEmployee)
routes.delete('/delete-employee/:id',authorizeRoles("manager"),deleteEmployee)
routes.patch('/update-employee/:id',authorizeRoles("manager","employee"),updateEmployee)


module.exports = routes