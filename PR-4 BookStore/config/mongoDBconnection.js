const mongoose = require("mongoose")

const mongooseConnection = () => {
  mongoose.connect("mongodb+srv://luv1210:luv1210@cluster0.xxws7ec.mongodb.net/bookstore")
  .then(() => console.log("DB connection Successfully"))
  .catch((err) => console.log(err));
}

module.exports = mongooseConnection;