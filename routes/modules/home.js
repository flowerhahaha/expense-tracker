const router = require('express').Router()
const dayjs = require('dayjs')
const Record = require('../../models/record')
const categoryList = require('../../models/seeds/categoryList.json')
const { yearList, monthList } = require('../../helpers/options-helpers')

// get homepage
router.get('/', async (req, res, next) => {
  try {
    const recordList = await Record
      .find({ userId: req.user._id })
      .populate('categoryId')
      .sort('-date')
      .lean()
    // calculate total amount and format date
    let totalAmount = 0
    if (!recordList.length) {
      res.locals.warning_msg = 'Please create an expense'
    } else {
      recordList.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
    }
    res.render('index', { categoryList, recordList, yearList, monthList, totalAmount })   
  } catch (e) {
    next(e)
  }
})

module.exports = router