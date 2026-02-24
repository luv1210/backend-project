const express = require('express')
const { addProductPage, addProduct, viewProducts, getallsubcategory, getallextracategory, editProductPage, editProduct, deleteProduct } = require('../controller/product.controller')
const upload = require('../middalwear/imageUpload')
const routes = express.Router()

routes.get('/add-product', addProductPage)
routes.post('/add-product', upload.single('productImage'), addProduct)
routes.get('/view-product', viewProducts)

// Edit page
// routes.get('/product/edit/:id', editProductPage)

// Update
routes.post('/product/update/:id', upload.single('productImage'), editProduct)

// Delete


routes.get('/edit/:id', editProductPage)
routes.post('/edit/:id', upload.single('productImage'), editProduct)

// Support DELETE method for AJAX/fetch requests and keep POST for form compatibility
routes.delete('/delete/:id', deleteProduct)
routes.post('/delete/:id', deleteProduct)

//get subcategory and extracategory onchange

routes.get('/subcategory/:id', getallsubcategory)
routes.get('/extracategory/:id', getallextracategory)

module.exports = routes