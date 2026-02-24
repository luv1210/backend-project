const express = require('express')
const { addCategorypage, addCategory, viewCategorypage, editCategorypage, updateCategory, deleteCategory } = require('../controller/category.controller')
const upload = require('../middalwear/imageUpload')
const route = express.Router()

route.get('/add-category',addCategorypage)
route.post('/add-category',upload.single('categoryImage'),addCategory)
route.get('/view-category',viewCategorypage)
route.get('/edit-category/:id',editCategorypage)
route.post('/update-category/:id',upload.single('categoryImage'),updateCategory)
route.get('/delete-category/:id',deleteCategory)

module.exports = route
