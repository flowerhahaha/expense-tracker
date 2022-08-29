if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Category = require('../category')
const User = require('../user')
const Record = require('../record')
const userList = require('./userList.json')
const recordList = require('./recordList.json')
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    // get categories
    const categories = await Category.find().lean()
    // create users
    await Promise.all(userList.map(async user => {
      const { name, email, password } = user
      const userData = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) 
      })
      console.log(`${name} was created`)
      // create user's records
      await Promise.all(recordList.map(async record => {
        const { name, date, amount, category } = record
        categoryData = categories.find(categoryData => categoryData.name === category)
        await Record.create({
          name,
          date,
          amount,
          userId: userData._id,
          categoryId: categoryData._id
        })
      }))
      console.log(`${userData.name}'s records were created`)
    }))
  } catch (e) {
    console.log(e)
  } finally {
    db.close()
  }
})