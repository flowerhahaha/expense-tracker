function notFoundErrorHandler (req, res) {
  console.log('404')
  res.locals.warning_msg = 'The requested URL was not found on this server'
  res.status(404).render('error')
}

function jwtExpiredErrorHandler (err, req, res, next) {
  if (err.message === 'jwt expired') {
    req.flash('warning_msg', 'The reset password link is expired')
    res.redirect('/auth/forgot-password')
  } else {
    next(err)
  }
}

function serverErrorHandler (err, req, res, next) {
  res.locals.warning_msg = 'Opps! Something wrong with the server. We will fix it soon.'
  console.log(err)
  res.status(500).render('error')
}

module.exports = {
  notFoundErrorHandler,
  jwtExpiredErrorHandler,
  serverErrorHandler
}