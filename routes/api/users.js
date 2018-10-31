// @ register & login

const express = require('express')
const router = express.Router()
const apiTpl = require('../../config/apiTpl')



/**
 * @method GET /api/user
 * @description 测试用例
 * @access public
 */
router.get('/',(req, res) => {
  res.json(apiTpl(0, {name: 'jonson'}, 'is works'))
})


module.exports = router