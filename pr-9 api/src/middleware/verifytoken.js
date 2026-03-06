const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

exports.verifytoken = async(req,res,next)=>{
    try {
        let authorization = req.headers.authorization
           
           if(!authorization){
            res.json({message:'Unauthorized'})
           }
            let token = authorization.split(" ")[1]
            let decode = jwt.verify(token,'devlop')
          let user = await userModel.findById(decode.userId)
          if(!user){
            res.json({message:"Invalid token"})
          }else{
            req.user = user
            next()
          }
      
    } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
        console.log(error)
        return res.json({message:'server error'})
    }
}



