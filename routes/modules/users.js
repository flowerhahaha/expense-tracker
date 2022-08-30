const router = require('express').Router()

// get user login page
router.get('/login', (req, res) => {
  res.render('login')
})

// get user register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router