//ListItemModel.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListItemShema = new Schema({
  serialNumber: Number,
  text: String,
  subList: Boolean,
  parent: String,
  children: Boolean,
  ancestors: [String]
})

const ListItemModel = mongoose.model("ListItemModel", ListItemShema)

module.exports = ListItemModel