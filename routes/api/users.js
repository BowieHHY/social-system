// @ login & regist

const express = require('express')

const router = express.Router();

// $route GET api/users/test
// @desc 返回请求的 json 数据
// @access public
// http://localhost:3000/api/users/test
router.get("/test", (req, res) => {
  res.json({msg:'login works'})
})

module.exports = router