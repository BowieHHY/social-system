const express = require('express')
const mongoose = require('mongoose')

const passport = require('passport')

// const bodyParser = require('body-parser')
const app = express()

// 引入 user.js
const users = require('./routes/api/users')

// 引入 profile.js
const profile = require('./routes/api/profile')

// db config
const db = require('./config/keys').MongoURI

// express 4.16版本以下的 用 body-parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// db conntect
mongoose
  .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('mongodb connected') })
  .catch((err) => { console.log(err) })


  // passport 初始化
app.use(passport.initialize())
// 把 passport 传递过去
require('./config/passport')(passport)
  
// 使用 user routes
app.use("/api/users", users)

// 使用 profile routes
app.use("/api/profile",profile)

// 端口
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("hello hhy")
})
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})