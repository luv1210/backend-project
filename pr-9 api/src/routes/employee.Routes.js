const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee.controller');
const verifyToken = require('../middaleware/verifyToken');
const roleCheck = require('../middaleware/roleCheck');

// Public routes
router.post('/login', employeeController.loginEmployee);

// Protected routes (require employee role)
router.get('/profile', verifyToken, roleCheck('employee'), employeeController.getProfile);
router.put('/profile', verifyToken, roleCheck('employee'), employeeController.updateProfile);
router.put('/change-password', verifyToken, roleCheck('employee'), employeeController.changePassword);
router.get('/all', verifyToken, roleCheck('admin','manager','employee'), employeeController.viewAllEmployees);

module.exports = router;