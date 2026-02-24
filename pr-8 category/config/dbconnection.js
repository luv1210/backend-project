const mongoose = require('mongoose')


const dbconnection = ()=>{
    const uri = process.env.MONGO_URI || 'mongodb+srv://luv1210:luv1210@cluster0.xxws7ec.mongodb.net/blog'
    mongoose.connect(uri)
    .then(()=>console.log('database is connected!!!!'))
    .catch(err=>console.log(err))
}


module.exports = dbconnection()
