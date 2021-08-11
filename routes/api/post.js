const express = require('express')
const router = express.Router();
const passport = require('passport')
const mongoose = require("mongoose")

const Profile = require('../../model/Profiles')
const User = require("../../model/User")

// profile验证
const validateProfileInput = require("../../validation/profile")
// experience验证
const validateExperienceInput = require("../../validation/experience")
// education验证
const validateEducationInput = require("../../validation/education")


// $route GET api/post/test
// @desc 返回请求的 json 数据
// @access public
// http://localhost:3000/api/post/test
router.get("/test", (req, res) => {
  res.json({msg:'post works'})
})



module.exports = router