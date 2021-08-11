const express = require('express')
const router = express.Router();
const passport = require('passport')
const mongoose = require("mongoose")

const Profile = require('../../model/Profiles')
const Post = require('../../model/Post')

// 验证
const validatePostInput = require('../../validation/post')

// $route GET api/post/test
// @desc 返回请求的 json 数据
// @access public
// http://localhost:3000/api/post/test
router.get("/test", (req, res) => {
  res.json({msg:'post works'})
})

// $route POST api/post
// @desc 创建评论接口
// @access private
// http://localhost:3000/api/post
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user:req.user.id
  })
  newPost.save().then(post=>{res.json(post)})

})


module.exports = router