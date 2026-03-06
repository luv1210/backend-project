

exports.authorizeRoles = (...roles)=>{
     return (req, res, next) => {
        if(!req.user){
           return res.json({message:'unauthorized'})
        }

        if(!roles.includes(req.user.role)){
          return  res.status(405).json({message:'access denied'})
        }

        next()
     }
}