const mongoose = require('mongoose')

const subcategorySchema = mongoose.Schema({
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorys'
    },
    subcategory:{
        type:String
    }
})



module.exports = mongoose.model('subcategory',subcategorySchema)