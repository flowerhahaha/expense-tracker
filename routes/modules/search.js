const router = require('express').Router()
const dayjs = require('dayjs')
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/categoryList.json')
const { createSearchOptions, yearList, monthList } = require('../../helpers/options-helpers')

// get search result
router.get('/', async (req, res, next) => {
  try {
    const { category, year, month } = req.query
    const userId = req.user._id
    const categoryData = await Category.findOne({ name: category })
    const categoryId = categoryData?._id
    // get search options
    const searchOptions = createSearchOptions(category, year, month, userId, categoryId)
    const recordList = await Record
      .find(searchOptions)
      .populate('categoryId')
      .sort({ date: '-1', _id: '-1' })
      .lean()
    // calculate total amount and format date
    let totalAmount = 0
    if (!recordList.length) {
      res.locals.warning_msg = 'No expense to show'
    } else {
      recordList.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
    }
    res.render('index', { categoryList, recordList, yearList, monthList, totalAmount, category, year: Number(year), month: Number(month) })
  } catch (e) {
    next(e)
  }
})

module.exports = router