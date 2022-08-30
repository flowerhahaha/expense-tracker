const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/categoryList.json')

// get create record page
router.get('/new', (req, res) => {
  res.render('new', { categoryList })
})

module.exports = router