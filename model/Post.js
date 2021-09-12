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
  name: {  //拿到当前评价你的name
    type:String
  },
  avatar: { //头像
    type:String
  },
  likes: [   //点赞
    {
      user: {    //用户点赞
        type: Schema.Types.ObjectId,
        ref: 'users', //对哪个表进行关联
      }
    }
  ],
  comments: [ //评论
    {
      user: { //用户评论
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