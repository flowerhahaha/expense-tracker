const Category = require('../models/category')

async function createSelectedCategoryIdList (category) {
  const categoryIdList = []
  categoryList = await Category.find().lean()
  if (category === 'All') {
    categoryList.forEach(data => categoryIdList.push(data._id))
  } else {
    categoryList.forEach(data => {
      if (data.name === category) categoryIdList.push(data._id)
    })
  }
  return categoryIdList
}

function createDateOption (year, month) {
  if (isNaN(month) || month < 1 || month > 12 || year === 'All') month = 'All'
  const minYear = year === 'All' ? 2020 : year
  const maxYear = year === 'All' ? 2100 : year
  const minMonth = month === 'All' ? 1 : month
  const maxMonth = month === 'All' ? 12 : month
  const dateOption = { $gte: `${minYear}-${minMonth}-01`, $lte: `${maxYear}-${maxMonth}-31` }
  return dateOption 
}

function createYearList () {
  const yearList = [2022, 2021, 2020]
  const today = new Date()
  const currentYear = today.getFullYear()
  for (let i = currentYear; i > 2022; i--) {
    yearList.unshift(i)
  }
  return yearList
}

module.exports = {
  createSelectedCategoryIdList,
  createDateOption,
  yearList: createYearList(),
  monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}