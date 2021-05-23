// @ login & regist

const express = require('express')

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const router = express.Router();

const User = require("../../model/User")

const keys = require("../../config/keys");

// $route GET api/users/test
// @desc 返回请求的 json 数据
// @access public
// http://localhost:3000/api/users/test
router.get("/test", (req, res) => {
  res.json({msg:'login works'})
})

router.post("/register", (req, res) => {
  // console.log('req.body',req.body)
  // 查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
      return res.status(400).json({email:'邮箱已被注册！'})
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar:'https://api.prodless.com/avatar.png',
          password: req.body.password
        })

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // hash 就是加密过后的密码
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.json(user)
              })
              .catch(err => {
                console.log(err)
              })
         })
        })
      }
    })
})

// $route GET api/users/login
// @desc token
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // 查询数据库
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({email:'该用户不存在！'})
      }

      //密码匹配
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {

          const rule = { id: user.id, name: user.username }
          // jwt.sign("规则","加密名字","过期时间","箭头函数",)
          jwt.sign(rule, keys.SecretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token:'hhy'+ token
            })
          })
        } else {
          return res.status(400).json({password:'密码错误'})
        }
      })
    })
})

module.exports = router