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

// $route GET api/post
// @desc 获取评论接口
// @access public
// http://localhost:3000/api/post
router.get("/",(req, res) => {
  Post.find()
    .sort({ date: -1 }) // 升序
    .then(posts => {
      res.json(posts)
    }).catch(err => {
      res.status(404).json({nopostfound:'找不到任何评论信息'})
    })

})

// $route GET api/post/:id
// @desc 获取单个评论接口
// @access public
// http://localhost:3000/api/post/:id
router.get("/:id",(req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 }) // 升序
    .then(post => {
      res.json(post)
    }).catch(err => {
      res.status(404).json({nopostfound:'找不到该评论信息'})
    })

})


module.exports = router