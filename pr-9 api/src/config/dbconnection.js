const mongoose = require('mongoose')

const dbconnection= ()=>{
    mongoose.connect('mongodb+srv://darshik111:dj123456@cluster0.h9zcb.mongodb.net/rolebaseapi')
    .then(()=>console.log("Databasi connected!!!"))
    .catch(error=>console.log(error))
}

module.exports = dbconnection()