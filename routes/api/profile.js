const express = require('express')
const router = express.Router();
const passport = require('passport')
const mongoose = require("mongoose")

const Profile = require('../../model/Profiles')
const User = require("../../model/User")

const validateProfileInput = require("../../validation/profile")


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
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  // populate: 展示关联数据表的数据
  // 展示user表的 name & avatar
  Profile.findOne({ user: req.user.id })
    .populate('user',['name','avatar'])
    .then(profile => {
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

// $route POST api/profile
// @desc 创建和编辑个人信息
// @access private
// http://localhost:3000/api/profile
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  // let errors ={}
  const { errors, isValid } = validateProfileInput(req.body)
  
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {}

  // 从前端获取数据
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  // skills - 数组转换
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",")
  }

  profileFields.social = {};
  if (req.body.wechat) profileFields.social.wechat = req.body.wechat;
  if (req.body.qq) profileFields.social.qq = req.body.qq;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // 用户信息存在,update
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields },{new:true}).then(success=>res.json(success))
    } else {
      // create
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = '该用户的handle个人信息已经存在,请勿重新创建';
          res.status(400).json(errors)
        }
        new Profile(profileFields).save().then(profile => {
          res.json(profile)
        })
      })
    }
  })

})

// $route GET api/profile/handle/:handle
// @desc 通过handle获取信息
// @access public
// http://localhost:3000/api/profile/handle/:handle
router.get("/handle/:handle", (req, res) => {
  const errors = {}
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = '未找到该用户信息'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
   
    })
})

// $route GET api/profile/user/:user_id
// @desc 通过handle获取信息user
// @access public
// http://localhost:3000/api/profile/user/:user_id
router.get("/user/:user_id", (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.params.user_id }) // user_id是router的id
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = '未找到该用户信息'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
   
    })
})


module.exports = router