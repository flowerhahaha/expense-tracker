const router = require('express').Router()
const dayjs = require('dayjs')
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryList = require('../../models/seeds/categoryList.json')
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// get homepage
router.get('/', (req, res, next) => {
  Record.find()
    .populate('categoryId')
    .sort('-date')
    .lean()
    .then(recordList => {
      let totalAmount = 0
      const yearList = new Set()
      recordList.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        yearList.add(dayjs(record.date).year())
        totalAmount += record.amount
      })
      res.render('index', { categoryList, recordList, yearList, monthList, totalAmount })
    })
    .catch(e => next(e))
})

module.exports = router