const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const search = require('./modules/search')
const records = require('./modules/records')
const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

// get 404 error page 
router.get('*', (req, res) => {
  res.locals.warning_msg = 'The requested URL was not found on this server'
  res.status(404).render('error')
})


// jwt expired error handling
router.use((err, req, res, next) => {
  if (err.message === 'jwt expired') {
    req.flash('warning_msg', 'The reset password link is expired')
    res.redirect('/auth/forgot-password')
  } else {
    next(err)
  }
})

// 500 error handling
router.use((err, req, res, next) => {
  res.locals.warning_msg = 'Sorry! Server is broken. We will fix it soon.'
  console.log(err)
  res.status(500).render('error')
})

module.exports = router