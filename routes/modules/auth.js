const router = require('express').Router()
const passport = require('../../config/passport')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const JWT_SECRET = process.env.JWT_SECRET
const { sendResentPasswordEmail } = require('../../helpers/email-helpers')

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// get forgot-password page
router.get('/forgot-password', (req, res, next) => {
  res.render('forgot-password')
})

// send reset password email
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body
    // check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      res.locals.warning_msg = "Email doesn't exist!"
      return res.render('forgot-password', { email })
    }
    // create a one time link valid for 10 minutes
    const secret = JWT_SECRET + user.password
    const payload = {
      email: user.email,
      id: user._id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '10m' })
    const link = `http://${req.headers.host}/auth/reset-password/${user._id}/${token}`
    // sent the link to the email
    await sendResentPasswordEmail(email, link)
    res.locals.success_msg = 'Password reset link has been sent to your email.'
    res.render('forgot-password', { email })
  } catch (error) {
    next(e)
  }
})

// get reset-password page
router.get('/reset-password/:id/:token', async (req, res, next) => {
  try {
    const { id, token } = req.params
    // check if the user id exists
    const user = await User.findById(id)
    if (!user) throw new Error('invalid id')
    // check if the token is valid
    const secret = JWT_SECRET + user.password
    jwt.verify(token, secret)
    res.render('reset-password', { id, token })
  } catch (e) {
    next(e)
  }
})

module.exports = router