const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// login with email and password
passport.use(new LocalStrategy(
  { 
    usernameField: 'email',
    passReqToCallback: true
  }, 
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      // if the email doesn't exist, return false and redirect to login page
      if (!user) {
        return done(null, false, req.flash('warning_msg', 'Incorrect email or password.'))
      }
      // if the password is incorrect, return false and redirect to login page
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, req.flash('warning_msg', 'Incorrect email or password.'))
      }
      // else return user and redirect to home page
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  }
))

// store user id in session while login
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// store user data in req object if the user already logged in
passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

module.exports = passport