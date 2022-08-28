const router = require('express').Router()
const home = require('./modules/home')

router.use('/', home)

module.exports = router