function createSearchOptions (category, year, month, userId, categoryId) {
  if (isNaN(month) || year === 'All') month = 'All'
  const minMonth = month === 'All' ? 1 : month
  const maxMonth = month === 'All' ? 12 : month
  const dateOption = { $gte: `${year}-${minMonth}-01`, $lte: `${year}-${maxMonth}-31` }
  // select nothing
  if (category === 'All' && year === 'All') {
    return { userId }
  }
  // only select category
  if (year === 'All') {
    return { userId, categoryId }
  }
  // only select year
  if (category === 'All') {
    return { userId, date: dateOption }
  }
  // select both category and year
  return { userId, categoryId, date: dateOption }
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
  createSearchOptions,
  yearList: createYearList(),
  monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}