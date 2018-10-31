const express = require('express')
const mongoose = require('mongoose')
const app = new express();

const port = process.env.PORT || 4000


// 引入user
const users = require('./routes/api/users')


// 使用router中间件使用user
app.use('/api/users', users)


// DB config
const db = require('./config/keys').mongoURI
// mongoDB connect
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB Connect!")
}).catch(err => {
  console.log(err);
})




app.listen(port, () => {
  console.info("server is running on: " + port);
})