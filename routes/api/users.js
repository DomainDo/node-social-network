const express = require('express')
const router = express.Router()
const apiTpl = require('../../config/apiTpl')
const User = require('../../model/User')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// 引入验证方法
const validatorReg = require('../../validation/register')
const validatorLogin = require('../../validation/login')

/**
 * @method GET /api/user
 * @description 测试用例
 * @access public
 * @returns 测试字段
 */
router.get('/', (req, res) => {
  res.json(apiTpl(0, { name: 'jonson' }, 'is works'))
})


/**
 * @method POST /api/user/register
 * @description 用户注册
 * @access public
 * @returns 
 */
router.post('/register', (req, res) => {
  const {msg, isValid} = validatorReg(req.body)
  if(!isValid) {
    // 不通过
    return res.json(apiTpl(1, 0, msg))
  }

  // res.json(apiTpl(0, req.body))
  const body = req.body
  // 查询数据库是否拥有邮箱
  User.findOne({ email: body.email }).then(user => {
    if (user) {
      return res.status(400).json(apiTpl(1, '', '邮箱已被注册'))
    } else {
      const newUser = new User({
        name: body.name,
        email: body.email,
        password: body.password,
      })
      // 加密密码
      bcrypt.hash(newUser.password, null, null, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        // 数据库存储
        newUser.save().then(user => {
          res.json(apiTpl(0, 0, '注册成功'))
        }).catch(err => {
          console.log(err);
        })
      });
    }
  }).catch(err => {
    console.log(err)
  })
})


/**
 * @method POST /api/user/login
 * @description 用户登录 使用jwt生成token
 * @access public
 * @returns token
 */
router.post('/login', (req, res) => {
  const {msg, isValid} = validatorLogin(req.body)
  if(!isValid) {
    // 不通过
    res.json(apiTpl(1, 0, msg))
  }
  const email = req.body.email
  const password = req.body.password
  // 查询数据库
  User.findOne({ email }).then(user => {
    if (!user) return res.json(apiTpl(1, '', '用户不存在'))
    // 密码匹配
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.json(apiTpl(1, '', '密码错误'))
      // 匹配成功 使用jwt生产token
      // jwt.sign('规则','加密名字','过期时间','箭头函数')
      const rule = { id: user.id, email: user.email }
      jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err
        const data = {
          token: 'Bearer ' + token
        }
        res.json(apiTpl(0, data, '登录成功'))
      })
    });
  })
})


/**
 * @method GET /api/user/news
 * @description 验证用户携带token
 * @access private
 */
router.get('/news', passport.authenticate('jwt', { session: false }), (req, res) => {
  const data = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  }
  res.json(apiTpl(0, data, 'token验证成功'))
})


module.exports = router