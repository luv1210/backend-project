const express = require('express')
const { registerUser,loginUser,viewProfile,changePassword} = require('../controller/auth.contoller')
const uploadImage = require('../middleware/imageUpload')
const { verifytoken } = require('../middleware/verifytoken')
const { authorizeRoles } = require('../middleware/authorizeRoles ')
const routes = express.Router()

routes.post("/register",verifytoken,uploadImage.single('profileImage'),registerUser)
routes.post('/login',loginUser)
routes.get('/profile',verifytoken,viewProfile)
routes.patch('/change-password',verifytoken,changePassword)

// admin routes 
routes.use('/admin',verifytoken,authorizeRoles('admin'),require('./admin.route'))

// manager routes 
routes.use('/manager',verifytoken,require('./manager.route'))

//employee routes 
routes.use('/employee',verifytoken,require('./employee.route'))
module.exports = routes