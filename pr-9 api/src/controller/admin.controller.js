const userModel = require('../model/user.model')

exports.getAllAdmin = async(req,res)=>{
    try {
        let admins = await userModel.find({role:'admin',isDeleted:false})
        return res.json({message:'get all admins',admins})
    } catch (error) {
        console.log(error)
        res.json({message:'server error'})
    }
}


exports.deleteAdmin = async(req,res)=>{
    try {
       let id = req.params.id 
       let deletedadmin = await userModel.findByIdAndUpdate(id,{isDeleted:true,isActive:false},{new:true})
       if(!deletedadmin){
      return  res.json({message:"admin not found"})
       }
       res.json({message:"admin Deleted",deletedadmin})
    } catch (error) {
        console.log(error)
        res.json({message:"server error"})
    }
}

exports.updateAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let updateadmin = await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
        if(!updateadmin){
            return res.json({message:"admin not found"})
        }
        res.json({message:"admin update successfully",updateadmin})
    } catch (error) {
        console.log(error)
        res.json({message:"server error"})
    }
}