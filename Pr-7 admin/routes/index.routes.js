const express = require('express')
const { deshborad } = require('../controller/index.controller')
const passport = require('passport')
const routes = express.Router()

routes.get('/',passport.checkAuthentication, deshborad)

// sub routes 
routes.use('/blog',passport.checkAuthentication,require('./blog.routes'))
routes.use('/admin',passport.checkAuthentication,require('./admin.routes'))
routes.use('/user',require('./auth.routes'))
module.exports = routes 