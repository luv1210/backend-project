const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
     firstname: {
    type: String,
    required: true,
    trim: true
  },

  lastname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  mobileNo: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    default: "employee"
  },

  profileImage: String,

  refreshToken: String,

  isActive: {
    type: Boolean,
    default: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, {
     timestamps: true ,
     versionKey: false
    })


module.exports = mongoose.model('users',userSchema)