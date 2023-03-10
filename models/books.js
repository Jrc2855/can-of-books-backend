'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  description: String,
  status: String,
  image: String,
})

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;