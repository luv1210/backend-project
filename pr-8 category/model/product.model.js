const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admins'
    },
    categoryid:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'categorys'
    },
    subcategoryid:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'subcategories'
    },
    extracategoryid:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'extracategories'
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    Description:{
        type:String
    },
    productImage:{
        type:String
    }
})


module.exports = mongoose.model('products',productSchema)