const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

// login with google
passport.use(new GoogleStrategy(
  {    
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  thirdPartyOAuthCallback
))

// login with facebook
passport.use(new FacebookStrategy(
  {    
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  thirdPartyOAuthCallback
))

// store user id in session while login
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// store user data in req object if the user already logged in
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean()
    done(null, user)
  } catch (e) {
    done(err, null)
  }
})

// callback function for google and facebook login strategy
async function thirdPartyOAuthCallback (accessToken, refreshToken, profile, done) {
  const { name, email } = profile._json
  try {
    // if the user doesn't exist, generate a random password and store the userData first
    let userData = await User.findOne({ email })
    if (!userData) {
      const randomPassword = Math.random().toString(36).slice(-8)
      const password = bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10), null)
      userData = await User.create({ name, email, password })
    }
    // log in to the homepage
    return done(null, userData)
  } catch (err) {
    done(err, false)
  }
}

module.exports = passport