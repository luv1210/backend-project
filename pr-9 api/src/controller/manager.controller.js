const userModel = require("../model/user.model")

exports.getAllManeger = async(req,res)=>{
  try {
        let managers = await userModel.find({role:'manager'})
       return res.json({message:'get all user',managers})
  } catch (error) {
    console.log(error)
    res.json({message:"server error"})
  }
}

exports.deleteManager = async(req,res)=>{
  try {
       let id = req.params.id
       let deletedmaneger = await userModel.findByIdAndUpdate(id,{idDeleted:true},{new:true})
       return res.json({message:'Manager was Deleted',deletedmaneger})
  } catch (error) {
    console.log(error)
    res.json({message:'server error'})
  }
}


exports.updateManager = async(req,res)=>{
    try {
        let id = req.params.id

        if(req.user.role !=="admin" && req.user._id != id){
             res.json({message:'Access Denide'})
        }
        let updatedmanager = await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
        if(!updatedmanager){
            return res.json({message:"manager not found"})
        }
        res.json({message:"admin update successfully",updatedmanager})
    } catch (error) {
        console.log(error)
        res.json({message:"server error"})
    }
}
