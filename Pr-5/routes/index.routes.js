const express = require('express')
const { homepage, addmoviepage, addmovi, deletemovie, editmoviepage, updatemovie, bollywood, hollywood } = require('../controller/index.controller')
const upload = require('../middelwear/imageupload')

const routes = express.Router()

routes.get('/',homepage)
routes.get('/bollywood',bollywood)
routes.get('/hollywood',hollywood)
routes.get('/add-movie',addmoviepage)
routes.post('/add-movie',upload.single('poster'),addmovi)
routes.get('/delete-movie/:id',deletemovie)
routes.get('/edit-movie/:id',editmoviepage)
routes.post('/update-movie/:id',upload.single('poster'),updatemovie)
module.exports = routes


