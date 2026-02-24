const categoryModel = require('../model/category.model')
const subcategoryModel = require('../model/subcategory.model')
const extracategoryModel = require('../model/extracategory.model')

exports.ExtraCategorypage = async (req, res) => {
    try {
        let category = await categoryModel.find()
        let subcategory = await subcategoryModel.find()
        res.render('extracategory/addExtracategory', { category, subcategory })
    } catch (error) {
        console.log(error)
    }
}


exports.addExtraCategory = async (req, res) => {
    try {
        let extracategory = await extracategoryModel.create(req.body)
        req.flash('success', "Extra Category Added")
        res.redirect('/extracategory/add-extracategory')
    } catch (error) {
        console.log(error)
        res.redirect('/category/add-category')
    }
}



exports.viewExtraCategorypage = async (req, res) => {
    try {
        let search = req.query.search || ""



        // let extracategoryes = await extracategoryModel.find().populate({
        //     path:'categoryid',
        //     match:{category: { $regex: search, $options: 'i' }}
        // }).populate({
        //     path:'subcategoryid',
        //     match:{subcategory: { $regex: search, $options: 'i' }}
        // })

        let extracategoryes = await extracategoryModel.aggregate([
            {
                $lookup: {
                    from: 'categorys',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'categoryid'
                },

            },

            {
                $unwind: { path: '$categoryid', }
            },


            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subcategoryid',
                    foreignField: '_id',
                    as: 'subcategoryid'
                },

            },

            {
                $unwind: {
                    path: '$subcategoryid',
                }
            }

        ])



        extracategoryes = extracategoryes.filter((subcat) => subcat.categoryid !== null || subcat.subcategoryid !== null)
        res.render('extracategory/viewExtracategory', { extracategoryes })
    } catch (error) {
        console.log(error)
    }
}


exports.editExtraCategorypage = async (req, res) => {
    try {
        let id = req.params.id
        let extracategory = await extracategoryModel.findById(id)

        res.render('extracategory/editExtracategory', { extracategory })
    } catch (error) {
        console.log(error)
    }
}

exports.updateExtraCategory = async (req, res) => {
    try {
        let id = req.params.id


        let extracategory = await extracategoryModel.findByIdAndUpdate(id, {
            extracategory: req.body.extracategory
        }, { new: true })
        req.flash('success', "Category Update!!!!")
        res.redirect('/extracategory/view-extracategory')
    } catch (error) {
        console.log(error)
    }
}



exports.deleteExtraCategory = async (req, res) => {
    try {
        let id = req.params.id

        console.log(id)

        await extracategoryModel.findByIdAndDelete(id)
        req.flash('success', "Sub Category Deleted!!!!")
        res.redirect('/extracategory/view-extracategory')
    } catch (error) {
        console.log(error)
    }
}

// get subcategory for drop down
exports.getallsubcategory = async (req, res) => {
    try {
        let id = req.params.id

        let allsubcategory = await subcategoryModel.find({ categoryid: id })
        res.json({ message: "fetch subcategory", allsubcategory })
    } catch (error) {
        console.log(error)
    }
}