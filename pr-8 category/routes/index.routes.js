const express = require('express')
const { deshborad } = require('../controller/index.controller')
require('../middalwear/localstrategy') // setup passport
const passport = require('passport')
const routes = express.Router()

routes.get('/', passport.checkAuthentication, deshborad)

// sub routes 
routes.use('/blog', passport.checkAuthentication, require('./blog.routes'))
routes.use('/admin', passport.checkAuthentication, require('./admin.routes'))
routes.use('/user', require('./auth.routes'))

routes.use('/category', passport.checkAuthentication, require('./category.routes'))
routes.use('/subcategory', passport.checkAuthentication, require('./subcategory.routes'))
routes.use('/extracategory', passport.checkAuthentication, require('./extracategory.routes'))
routes.use('/product', passport.checkAuthentication, require('./product.routes'))
routes.use('/findcategories',passport.checkAuthentication,require('./findcategories.routes'))

module.exports = routes 