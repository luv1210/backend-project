const mongoose = require('mongoose')

const dbconnection= ()=>{
    mongoose.connect('mongodb+srv://luv1210:luv1210@cluster0.xxws7ec.mongodb.net/rolebaseapi')
    .then(()=>console.log("Database connected!"))
    .catch(error=>console.log(error))
}

module.exports = dbconnection()