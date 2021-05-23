const express = require('express')
const mongoose = require('mongoose')
const app = express()

const db=require('./config/keys').MongoURI
mongoose
  .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('mongodb connected') })
  .catch((err)=>{console.log(err)})

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("hello hhy")
})
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})