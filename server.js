const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = new express();

// 引入user
const users = require('./routes/api/users')

// 使用body-parser中间件 要放到 使用router之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用router中间件，使用user
app.use('/api/users', users)

// DB config
const db = require('./config/keys').mongoURI
// mongoDB connect
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB Connect!")
}).catch(err => {
  console.log(err);
})


// passport 初始化
app.use(passport.initialize())
// 把passport对象传递出去，实现代码抽离
require('./config/passport')(passport)





const port = process.env.PORT || 4000

app.listen(port, () => {
  console.info("server is running on: " + port);
})