const express = require('express')
const router = express.Router();
const passport = require('passport')
const mongoose = require("mongoose")

const Profile = require('../../model/Profiles')
const User = require("../../model/User")


// $route GET api/profile/test
// @desc 返回请求的 json 数据
// @access public
// http://localhost:3000/api/profile/test
router.get("/test", (req, res) => {
  res.json({msg:'profile works'})
})

// $route GET api/profile
// @desc 获取当前用户登录的个人信息
// @access private
// http://localhost:3000/api/profile
router.get("/",passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const errors = {}
    if (!profile) {
      errors.noProfile = '该用户信息不存在！';
      return res.status(404).json(errors)
    }
    res.json(profile)
  }).catch(err => {
    res.status(404).json(err)
  })
})

module.exports = router