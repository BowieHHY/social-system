// @ login & regist

const express = require('express')

const bcrypt = require("bcrypt")

const router = express.Router();

const User = require("../../model/User")


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

module.exports = router