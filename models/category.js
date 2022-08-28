const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)