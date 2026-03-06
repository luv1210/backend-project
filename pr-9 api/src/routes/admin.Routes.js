const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const verifyToken = require('../middaleware/verifyToken');
const roleCheck = require('../middaleware/roleCheck');

// Public routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Protected routes (require admin role)
router.get('/profile', verifyToken, roleCheck('admin'), adminController.getProfile);
router.put('/profile', verifyToken, roleCheck('admin'), adminController.updateProfile);
router.put('/change-password', verifyToken, roleCheck('admin'), adminController.changePassword);
router.delete('/:id', verifyToken, roleCheck('admin'), adminController.deleteAdmin);

// Manager management (admin only)
router.post('/manager', verifyToken, roleCheck('admin'), adminController.addManager);
router.get('/managers', verifyToken, roleCheck('admin'), adminController.getAllManagers);
router.put('/manager/:id', verifyToken, roleCheck('admin'), adminController.updateManager);
router.delete('/manager/:id', verifyToken, roleCheck('admin'), adminController.deleteManager);

module.exports = router;