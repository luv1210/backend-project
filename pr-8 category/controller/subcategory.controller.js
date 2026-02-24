const categoryModel = require('../model/category.model')
const subcategoryModel = require('../model/subcategory.model')


exports.addSubCategorypage = async (req, res) => {
    try {
        let category = await categoryModel.find()
        res.render('subcategory/addSubcategory', { category })
    } catch (error) {
        console.log(error)
    }
}


exports.addSubCategory = async (req, res) => {
    try {
        let subcategory = await subcategoryModel.create(req.body)
        req.flash('success', "sub Category Added")
        res.redirect('/subcategory/add-subcategory')
    } catch (error) {
        console.log(error)
        res.redirect('/category/add-category')
    }
}



exports.viewSubCategorypage = async (req, res) => {
    try {
        let search = req.query.search || ""
        console.log(search)


        let subcategoryes = await subcategoryModel.find().populate({
            path: 'categoryid',
            match: { category: { $regex: search, $options: 'i' } }
        })

        subcategoryes = subcategoryes.filter((subcat) => subcat.categoryid !== null)
        console.log(subcategoryes)
        res.render('subcategory/viewsubcategory', { subcategoryes })
    } catch (error) {
        console.log(error)
    }
}


exports.editSubCategorypage = async (req, res) => {
    try {
        let id = req.params.id
        let subcategory = await subcategoryModel.findById(id)

        res.render('subcategory/editSubcategory', { subcategory })
    } catch (error) {
        console.log(error)
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        let id = req.params.id


        let subcategory = await subcategoryModel.findByIdAndUpdate(id, {
            subcategory: req.body.subcategory
        }, { new: true })
        console.log(subcategory)
        req.flash('success', "Category Update!!!!")
        res.redirect('/subcategory/view-subcategory')
    } catch (error) {
        console.log(error)
    }
}



exports.deleteSubCategory = async (req, res) => {
    try {
        let id = req.params.id

        console.log(id)

        await subcategoryModel.findByIdAndDelete(id)
        req.flash('success', "Sub Category Deleted!!!!")
        res.redirect('/subcategory/view-subcategory')
    } catch (error) {
        console.log(error)
    }
}