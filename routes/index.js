const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const search = require('./modules/search')
const records = require('./modules/records')
const { authenticator } = require('../middleware/auth')
const errorHandler = require('../middleware/error-handler')

router.use('/auth', auth)
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

// 404 error, jwt expired error, 500 error handlers
router.get('*', errorHandler.notFoundErrorHandler)
router.use(errorHandler.jwtExpiredErrorHandler)
router.use(errorHandler.serverErrorHandler)

module.exports = router