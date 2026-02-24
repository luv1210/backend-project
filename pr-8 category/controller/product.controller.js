let categoryModel = require('../model/category.model')
let subcategoryModel = require('../model/subcategory.model')
let extracategoryModel = require('../model/extracategory.model')
let productModel = require('../model/product.model')
exports.addProductPage = async (req, res) => {
    try {
        let category = await categoryModel.find()
        res.render('product/addProduct', { category })
    } catch (error) {
        console.log(error)
    }
}


exports.addProduct = async (req, res) => {
    try {
        let imagepath = ""
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        let product = await productModel.create({
            ...req.body,
            productImage: imagepath,
            userid: req.user._id
        })
        req.flash('success', 'product add success')
        res.redirect('/product/add-product')
    } catch (error) {
        console.log(error)
    }
}


exports.viewProducts = async (req, res) => {
    try {
        let search = req.query.search || ""
        let products = await productModel.aggregate([
            {

                $lookup: {
                    from: 'categorys',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'categoryid'
                }
            },
            {
                $unwind: {
                    path: '$categoryid'
                }
            },
            {

                $lookup: {
                    from: 'subcategories',
                    localField: 'subcategoryid',
                    foreignField: '_id',
                    as: 'subcategoryid'
                }
            },
            {
                $unwind: {
                    path: '$subcategoryid'
                }
            },
            {

                $lookup: {
                    from: 'extracategories',
                    localField: 'extracategoryid',
                    foreignField: '_id',
                    as: 'extracategoryid'
                }
            },
            {
                $unwind: {
                    path: '$extracategoryid'
                }
            },
            {
                $match: {
                    $or: [
                        { title: { $regex: search, $options: "i" } },
                        { "categoryid.category": { $regex: search, $options: "i" } },
                        { "subcategoryid.subcategory": { $regex: search, $options: "i" } },
                        { "extracategoryid.extracategory": { $regex: search, $options: "i" } },
                        { Description: { $regex: search, $options: "i" } }
                    ]
                }
            }
        ])
        res.render("product/viewProductFixed", { products, search })
    } catch (error) {
        console.log(error)
    }
}
// dropdown selection api
exports.getallsubcategory = async (req, res) => {
    try {
        let id = req.params.id
        let allsubcategory = await subcategoryModel.find({ categoryid: id })
        res.json({ message: "fetch all subcategorys", allsubcategory })
    } catch (error) {
        console.log(error)
    }
}

exports.getallextracategory = async (req, res) => {
    try {
        let id = req.params.id
        let allextracategory = await extracategoryModel.find({ subcategoryid: id })
        res.json({ message: "fetch all extracategorys", allextracategory })
    } catch (error) {
        console.log(error)
    }
}

exports.editProductPage = async (req, res) => {
    try {
        let id = req.params.id
        let product = await productModel.findById(id)
        // fetch all categories for the category dropdown
        let categories = await categoryModel.find()
        // fetch subcategories for the product's category (if set)
        let subcategories = []
        let extracategories = []
        if (product && product.categoryid) {
            subcategories = await subcategoryModel.find({ categoryid: product.categoryid })
        }
        if (product && product.subcategoryid) {
            extracategories = await extracategoryModel.find({ subcategoryid: product.subcategoryid })
        }

        res.render('product/editproduct', { product, categories, subcategories, extracategories })
    } catch (error) {
        console.log(error)
    }
}

exports.editProduct = async (req, res) => {
    try {
        let id = req.params.id
        let imagepath = ""
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }

        let updateData = {
            ...req.body
        }

        if (imagepath) {
            updateData.productImage = imagepath
        }

        await productModel.findByIdAndUpdate(id, updateData)
        req.flash('success', 'Product updated successfully')
        res.redirect('/product/view-product')
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        await productModel.findByIdAndDelete(id)
        // If this is an AJAX/fetch request, return JSON; otherwise redirect
        const accepts = req.headers['accept'] || ''
        if (accepts.includes('application/json')) {
            return res.json({ success: true })
        }
        req.flash('success', 'Product deleted successfully')
        return res.redirect('/product/view-product')
    } catch (error) {
        console.log(error)
        const accepts = req.headers['accept'] || ''
        if (accepts.includes('application/json')) {
            return res.status(500).json({ success: false, error: 'Delete failed' })
        }
        req.flash('error', 'Delete failed')
        res.redirect('/product/view-product')
    }
}
