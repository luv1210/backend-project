const express = require('express')
const routes = express.Router()


const SubcategoryModel = require('../model/subcategory.model')
const ExtracategoryModel = require('../model/extracategory.model')



routes.get('/getsubcategory/:id', async(req,res)=>{
      try {
            let id = req.params.id
            console.log(id)
           let getsubcategory = await SubcategoryModel.find({categoryid:id})
           console.log(getsubcategory)
              res.json({message:'get subcategory',subcategory:getsubcategory})
        } catch (error) {
            req.flash('error',error.message)
            res.redirect('/extracategory/add-extracategory')
        }
})

routes.get('/getextracategory/:id',async(req,res)=>{
      try {
            let id = req.params.id
           let getextracategory = await ExtracategoryModel.find({subcategoryid:id})
              res.json({message:'get subcategory',extracategory:getextracategory})
        } catch (error) {
            req.flash('error',error.message)
            res.redirect('/extracategory/add-extracategory')
        }
})


module.exports = routes
