const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validatorReg(data) {
  let msg = ''

  if(!validator.isLength(data.name,{min: 2, max: 5})){
    msg = '名字大2小5'
  }

  return {
    msg,
    isValid: isEmpty(msg)
  }
}