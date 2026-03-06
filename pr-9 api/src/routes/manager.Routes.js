const express = require('express');
const router = express.Router();
const managerController = require('../controller/manager.controller');
const verifyToken = require('../middaleware/verifyToken');
const roleCheck = require('../middaleware/roleCheck');

// Public routes
router.post('/login', managerController.loginManager);

// Protected routes (require manager role)
router.get('/profile', verifyToken, roleCheck('manager'), managerController.getProfile);
router.put('/profile', verifyToken, roleCheck('manager'), managerController.updateProfile);
router.put('/change-password', verifyToken, roleCheck('manager'), managerController.changePassword);

// Employee management (manager only)
router.post('/employee', verifyToken, roleCheck('manager'), managerController.addEmployee);
router.get('/employees', verifyToken, roleCheck('manager','admin'), managerController.getAllEmployees);
router.put('/employee/:id', verifyToken, roleCheck('manager'), managerController.updateEmployee);
router.delete('/employee/:id', verifyToken, roleCheck('manager'), managerController.deleteEmployee);

// Calculator
router.post('/calculator', verifyToken, roleCheck('manager'), managerController.calculator);

module.exports = router;