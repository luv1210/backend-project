const sendmail = require('../middleware/sendmail')
let userModel = require('../model/user.model')
let bcrypt = require('bcrypt')
let jwt  = require('jsonwebtoken')
exports.registerUser = async(req,res)=>{
    try {
         if(req.user.role == "admin" && req.body.role != "manager" ){
          return res.json({message:'Access Denide'})
         }

         if(req.user.role == "manager" && req.body.role != "employee"){
          return res.json({message:'Access Denide'})
         }
         if(req.user.role == "employee"){
          return res.json({message:'Access Denide'})
         }
        let emailexists = await userModel.findOne({email:req.body.email})
        let imagepath = ''
        if(emailexists){
            res.json({message:"Email already exists, try a different email"})
        }

        if(req.file){
             imagepath = `/uploads/${req.file.filename}`
        }
        let haspassword = await bcrypt.hash(req.body.password,10)
   let user = await userModel.create({...req.body,password:haspassword,profileimage:imagepath})

   let message = {
        from:"darshikshekhada07@gmail.com",
        to:req.body.email,
        subject:'Your role is ',
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px 0;">
  
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:20px; text-align:center; color:white;">
      <h1 style="margin:0;">Welcome 🎉</h1>
      <p style="margin:5px 0 0;">Your Account Details</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <h2 style="color:#333;">Hi ${req.body.firstname},</h2>

      <p style="color:#555; font-size:16px;">
        Your account has been created successfully. Here are your details:
      </p>

      <div style="background:#f9fafb; padding:20px; border-radius:8px; margin:20px 0;">
        <p style="margin:10px 0;"><strong>Role:</strong> ${req.body.role}</p>
        <p style="margin:10px 0;"><strong>User Name:</strong> ${req.body.email}</p>
        <p style="margin:10px 0;"><strong>Password:</strong> ${req.body.password}</p>
      </div>

      <p style="color:#777;">
        Please keep your login details safe.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin-top:30px;">
        <a href="#" 
          style="background:#2563eb; color:white; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold;">
          Login Now
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:14px; color:#777;">
      © 2026 Your Company • All Rights Reserved
    </div>

  </div>
</div>
`

    }
    sendmail(message)
     res.json({message:'user register successfully',user})
    } catch (error) {
        console.log(error)
        res.json({message:"server error"})
    }
}



exports.loginUser = async(req,res)=>{
  try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
         return res.status(404).json({message:"user not found"})
        }

        if(user.isDeleted == true){
          return res.json({message:'Your Account has been Deleted'})
        }

        let matchpassword = await bcrypt.compare(req.body.password,user.password)
        if(!matchpassword){
        return  res.json({message:'Password not match'})
        }
         let token = jwt.sign({userId:user._id,role:user.role},'devlop',{expiresIn:"5m"})
        res.json({message:'login successfully',user:token})
  } catch (error) {
    console.log(error)
    res.json({message:'server error'})
  }
}



exports.changePassword = async(req,res)=>{
  try {
       let {oldpassword,newpassword,confirmpassword} = req.body 
      let user = await userModel.findById(req.user._id)
      if(!user){
        res.json({message:'unauthorized'})
      }
      let matchpassword = await bcrypt.compare(oldpassword,req.user.password)
      if(!matchpassword){
        return res.json({message:'old password is not match'})
      }

      if(newpassword != confirmpassword){
        return res.json({message:'new password and confirm password not match'})
      }

      let haspassword = await bcrypt.hash(newpassword,10)
         await userModel.findByIdAndUpdate(req.user._id,{password:haspassword},{new:true})
          let message = {
        from:"darshikshekhada07@gmail.com",
        to:req.user.email,
        subject:'Change password ',
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px 0;">
  
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:20px; text-align:center; color:white;">
      <h1 style="margin:0;">Welcome 🎉</h1>
      <p style="margin:5px 0 0;">Your Password Details</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <h2 style="color:#333;">Hi ${req.user.firstname},</h2>

      <p style="color:#555; font-size:16px;">
        Your password has been updated successfully. Here are your details:
      </p>

      <div style="background:#f9fafb; padding:20px; border-radius:8px; margin:20px 0;">
        <p style="margin:10px 0;"><strong>New Password:</strong> ${newpassword}</p>
      </div>

      <p style="color:#777;">
        Please keep your login details safe.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin-top:30px;">
        <a href="#" 
          style="background:#2563eb; color:white; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold;">
          Login Now
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:14px; color:#777;">
      © 2026 Your Company • All Rights Reserved
    </div>

  </div>
</div>
`
          }
         sendmail(message)
         res.json({message:'password change'})
  } catch (error) {
    console.log(error)
    res.json({message:'server error'})
  }
}



exports.viewProfile = async(req,res)=>{
  try {
    let user = req.user
    if(!user){
      res.json({message:'user not found'})
    }else{
      res.json({message:'get profile',user})
    }
  } catch (error) {
    console.log(error)
    res.json({message:'server error'})
  }
}




