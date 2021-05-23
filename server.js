const express = require('express')
const mongoose = require('mongoose')
const app = express()

// 引入 user.js
const users = require('./routes/api/users')

// db config
const db = require('./config/keys').MongoURI

// db conntect
mongoose
  .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('mongodb connected') })
  .catch((err) => { console.log(err) })
  
// 使用 routes
app.use("/api/users",users)


const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("hello hhy")
})
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})