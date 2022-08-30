const router = require('express').Router()
const dayjs = require('dayjs')
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/categoryList.json')
const { createSelectedCategoryIdList, createDateOption, yearList, monthList } = require('../../helpers/options-helpers')
const currentYear = dayjs().year()

// get search result
router.get('/', async (req, res, next) => {
  try {
    let { category, year, month } = req.query
    // get search options
    const categoryIdList = await createSelectedCategoryIdList(category)
    const dateOption = createDateOption(year, month, currentYear)
    const recordList = await Record
      .find({ 
        userId: req.user._id,
        categoryId: { $in: categoryIdList },
        date: dateOption
      })
      .populate('categoryId')
      .sort('-date')
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