const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validatorLogin(data) {
  data.password = isEmpty(data.password) ? '' : data.password
  data.email = isEmpty(data.email) ? '' : data.email

  let msg = ''
  if (Validator.isEmpty(data.password)) {
    msg = '密码不能为空'
  }
  if (!Validator.isEmail(data.email)) {
    msg = '请输入合法邮箱'
  }
  if (Validator.isEmpty(data.email)) {
    msg = '邮箱不能为空'
  }
  return {
    msg,
    isValid: isEmpty(msg)
  }
}