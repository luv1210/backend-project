const express = require('express')
const productModel = require('../model/product.model')
const routes = express.Router()

// Public webpage showing all products with category info
routes.get('/', async (req, res) => {
    try {
        let products = await productModel.aggregate([
            {
                $lookup: {
                    from: 'categorys',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'categoryid'
                }
            },
            { $unwind: { path: '$categoryid', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subcategoryid',
                    foreignField: '_id',
                    as: 'subcategoryid'
                }
            },
            { $unwind: { path: '$subcategoryid', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'extracategories',
                    localField: 'extracategoryid',
                    foreignField: '_id',
                    as: 'extracategory'
                }
            },
            { $unwind: { path: '$extracategory', preserveNullAndEmptyArrays: true } }
        ])
        res.render('webpage', { products })
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

module.exports = routes

