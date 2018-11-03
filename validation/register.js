const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validatorReg(data) {
  // 防止前端不传某个字段时会导致500服务器报错（ Expected string but received a undefined.）的问题，这样就会返回我们设置的字符串
  data.name = isEmpty(data.name) ? '' : data.name
  data.email = isEmpty(data.email) ? '' : data.email
  data.password = isEmpty(data.password) ? '' : data.password
  data.password2 = isEmpty(data.password2) ? '' : data.password2
  
  let msg = ''
  if(!Validator.equals(data.password, data.password2)) {
    msg = '两次密码不一致'
  }
  if (Validator.isEmpty(data.password2)) {
    msg = '确认密码不能为空'
  }
  if (!Validator.isLength(data.password, { min: 6, max: 10 })) {
    msg = '密码大于6位小于10位'
  }
  if (Validator.isEmpty(data.password)) {
    msg = '密码不能为空'
  }
  if (!Validator.isEmail(data.email)) {
    msg = '请输入合法邮箱'
  }
  if (Validator.isEmpty(data.email)) {
    msg = '邮箱不能为空'
  }
  if (!Validator.isLength(data.name, { min: 2, max: 5 })) {
    msg = '名字大2小5'
  }

  return {
    msg,
    isValid: isEmpty(msg)
  }
}