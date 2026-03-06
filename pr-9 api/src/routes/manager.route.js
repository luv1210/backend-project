const express = require('express')
const { verifytoken } = require('../middleware/verifytoken')
const { authorizeRoles } = require('../middleware/authorizeRoles ')
const { getAllManeger,deleteManager ,updateManager} = require('../controller/manager.controller')
const routes = express.Router()

routes.get('/get-allmanager',authorizeRoles('admin',"manager"),getAllManeger)
routes.delete('/delete-manager/:id',authorizeRoles("admin"),deleteManager)
routes.patch('/update-manager/:id',authorizeRoles("admin","manager"),updateManager)


module.exports = routes