const express = require('express')
const routes = express.Router()

routes.use("/api",require('./api.route'))

module.exports = routes