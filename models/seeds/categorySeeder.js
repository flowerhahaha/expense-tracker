if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const categoryList = require('./categoryList.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    await Category.create(categoryList)
    console.log('Categories were created.')
  } catch (e) {
    console.log(e)
  } finally {
    db.close()
  }
})