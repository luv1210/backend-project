const mongoose = require('mongoose')

const dbconnection = ()=>{
    mongoose.connect('mongodb+srv://luv1210:luv1210@cluster0.xxws7ec.mongodb.net/bookmyshow')
    .then(()=>console.log("db is connected!!!!"))
    .catch(err=>console.log(err))
}

module.exports = dbconnection()