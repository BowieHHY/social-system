const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
  // user表进行关联
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  // 存储对应的登录用户名 请求对应的数据
  text: {
    type: String,
    required: true,
  },
  name: {
    type:String
  },
  avatar: {
    type:String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type:String
      },
      avatar: {
        type:String
      },
      text: {
        type: String,
        required:true
      },
      date: {
        type: Date,
        default:Date.now
      },
    }
  ],
  date: {
    type: Date,
    default:Date.now
  },
})

module.exports = Post = mongoose.model("post",PostSchema)