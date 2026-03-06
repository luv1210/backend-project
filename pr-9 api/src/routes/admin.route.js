const express = require('express')
const { getAllAdmin,deleteAdmin,updateAdmin } = require('../controller/admin.controller')
const { route } = require('./manager.route')
const routes = express.Router()

routes.get('/get-alladmin',getAllAdmin)
routes.delete('/delete-admin/:id',deleteAdmin)
routes.patch('/update-admin/:id',updateAdmin)
module.exports = routes