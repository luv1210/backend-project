
const express = require('express')
const { ExtraCategorypage, addExtraCategory, viewExtraCategorypage, editExtraCategorypage ,updateExtraCategory, deleteExtraCategory, getallsubcategory } = require('../controller/extracategory.controller')

const route = express.Router()

route.get('/add-extracategory',ExtraCategorypage)


route.post('/add-extracategory',addExtraCategory)
route.get('/view-extracategory',viewExtraCategorypage)
route.get('/edit-extracategory/:id',editExtraCategorypage)
route.post('/update-extracategory/:id',updateExtraCategory)
route.get('/delete-extracategory/:id',deleteExtraCategory)

//dependet dropdown api

route.get('/subcategory/:id',getallsubcategory)

module.exports = route
