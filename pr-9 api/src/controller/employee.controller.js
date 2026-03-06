const userModel = require("../model/user.model")

exports.getAllEmployee = async(req,res)=>{
  try {
        let employee = await userModel.find({role:'employee'})
       return res.json({message:'get all user',employee})
  } catch (error) {
    console.log(error)
    res.json({message:"server error"})
  }
}


exports.deleteEmployee = async(req,res)=>{
  try {
       let id = req.params.id
       let deletedemployee = await userModel.findByIdAndUpdate(id,{idDeleted:true},{new:true})
       return res.json({message:'Manager was Deleted',deletedemployee})
  } catch (error) {
    console.log(error)
    res.json({message:'server error'})
  }
}


exports.updateEmployee = async(req,res)=>{
    try {
        let id = req.params.id

        if(req.user.role !=="manager" && req.user._id != id){
             res.json({message:'Access Denide'})
        }
        let updatedemployee = await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
        if(!updatedemployee){
            return res.json({message:"manager not found"})
        }
        res.json({message:"admin update successfully",updatedemployee})
    } catch (error) {
        console.log(error)
        res.json({message:"server error"})
    }
}