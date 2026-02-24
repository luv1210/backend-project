
const mongoose = require('mongoose')

const extracategorySchema = mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorys'
    },
     subcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory'
    },
    extracategory:{
        type:String
    }
})



module.exports = mongoose.model('extracategories',extracategorySchema)
