const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  avatar: {
    type: String,
  },
  createDate: {
    type: Date,
    default:Date.now
  },
})

module.exports = User = mongoose.model("users",UserSchema)