const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  // user表进行关联
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  // 存储对应的登录用户名 请求对应的数据
  handle: {
    type: String,
    required: true,
    max:40
  },
  company: {  // 公司
    type: String,
   
  },
  website: {  // 网站
    type: String,
   
  },
  location: {  // 地址
    type: String,
   
  },
  status: {  // 职位
    type: String,
    required:true
  },
  skills: {  // 技能
    type: [String],
    required:true
  },
  bio: {  // 个人简介
    type: String,
   
  },
  githubusername: {  // github
    type: String,
   
  },
  experience: [  // 工作经验
    {
      current: {
        type: Boolean,
        default:true
      },
      title: {  // 经验
        type: String,
        required:true
      },  
      company: {  // 公司
        type: String,
        required:true
      },
      location: {  // 地点
        type: String,

      },
      from: {  // from
        type: String,
        required:true
      },
      to: {   // [结束]
        type: String,

      },
      description: {
        type: String,

      },
    }
  ],
  education: [  // 教育
    {
      current: {
        type: Boolean,
        default:true
      },
      school: {  // 学校
        type: String,
        required:true
      },
      degree: {  // 等级
        type: String,
        required:true
      },
      fieldofstudy: {  // 专业
        type: String,

      },
      from: {  // 开始
        type: String,
        required:true
      },
      to: {   // 结束
        type: String,

      },
      description: {
        type: String,

      },
    }
  ],
  social: {
    wechat: {  // 微信
      type: String,
    },
    qq: {   // qq
      type: String,
    }
  },
  createDate: {
    type: Date,
    default:Date.now
  },
})

module.exports = Profile = mongoose.model("profiles",ProfileSchema)