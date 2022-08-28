const router = require('express').Router()

// get homepage
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router