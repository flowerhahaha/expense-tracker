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
    if (!name.trim() || !amount.trim()) {
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

// get edit record page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    // user can only access their own record
    const record = await Record.findOne({_id, userId}).populate('categoryId').lean()
    if (!record) {
      req.flash('warning_msg', "Record doesn't exist!.")
      return res.redirect('/')
    }
    record.date = record.date.toISOString().slice(0, 10)
    res.render('edit', { record, categoryList })
  } catch (e) {
    next(e)
  }
})

// edit a record
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const { name, date, category, amount } = req.body
    // check the record data
    if (!name.trim() || !amount.trim()) {
      req.flash('warning_msg', "All the fields are required.")
      return res.redirect(`/records/${_id}/edit`)
    }
    // user can only edit their own record
    const categoryData = await Category.findOne({ name: category })
    await Record.findOneAndUpdate({_id, userId}, { name, date, amount, categoryId: categoryData?._id })
    req.flash('success_msg', 'Your expense was edited.')
    res.redirect('/')
  } catch (e) {
    next(e)
  }
})

// delete a record
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    // user can only delete their own record
    await Record.findByIdAndDelete({ _id, userId })
    req.flash('success_msg', 'Your expense was deleted.')
    res.redirect('/')
  } catch (e) {
    next(e)
  }
})

module.exports = router