const router = require('express').Router()
const home = require('./modules/home')

router.use('/', home)

// get 404 error page 
router.get('*', (req, res) => {
  res.locals.danger_msg = 'The requested URL was not found on this server'
  res.status(404).render('error')
})

// 500 error handling
router.use((err, req, res, next) => {
  res.locals.danger_msg = 'Sorry! Server is broken. We will fix it soon.'
  console.log(err)
  res.status(500).render('error')
})

module.exports = router