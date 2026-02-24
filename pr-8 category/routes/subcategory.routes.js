const express = require('express')
const { addSubCategorypage, addSubCategory, viewSubCategorypage, deleteSubCategory, editSubCategorypage, updateSubCategory } = require('../controller/subcategory.controller')

const route = express.Router()

route.get('/add-subcategory',addSubCategorypage)


route.post('/add-subcategory',addSubCategory)
route.get('/view-subcategory',viewSubCategorypage)
route.get('/edit-subcategory/:id',editSubCategorypage)
route.post('/update-subcategory/:id',updateSubCategory)
route.get('/delete-subcategory/:id',deleteSubCategory)

module.exports = route
