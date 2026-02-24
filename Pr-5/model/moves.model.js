const mongoose = require('mongoose')

const movieSchema  = mongoose.Schema({
       title:{
        type:String
       },
       director:{
              type:String
       },
       year:{
              type:String
       },
       duration:{
              type:String
       },
       language:{
              type:String
       },
       industry:{
              type:String
       },
       genre:{
              type:String
       },
       description:{
              type:String
       },
       rating:{
              type:String
       },
       poster:{
              type:String
       }
})

// title
// director
// year
// duration
// language
// industry
// genre
// description
// rating
// poster

module.exports = mongoose.model('movies',movieSchema)