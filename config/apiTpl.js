module.exports = function apiTpl(code, data, msg) {
  return {
    code: code,
    data: data || '',
    msg: msg || '',
  }
}