const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/categoryList.json')

// get create record page
router.get('/new', (req, res) => {
  res.render('new', { categoryList })
})

// create a new record
router.post('/', async (req, res, next) => {
  try {
    const { name, date, category, amount } = req.body
    // check the record data
    if (!name.trim() || !date?.trim() || !category?.trim() || !amount?.trim()) {
      res.locals.warning_msg = 'All the fields are required.'
      return res.render('new', { name, date, category, amount, categoryList })
    }
    // create record
    const categoryData = await Category.findOne({ name: category })
    await Record.create({
      name,
      date,
      amount,
      categoryId: categoryData?._id,
      userId: req.user._id
    })
    req.flash('success_msg', 'Your expense was created.')
    res.redirect('/')
  } catch (e) {
    next(e)
  }
})

module.exports = router