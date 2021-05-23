const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  },
  avatar: {
    type: String,
  },
  createDate: {
    type: Date,
    require:Date.now
  },
})

module.exports = User = mongoose.model("users",UserSchema)