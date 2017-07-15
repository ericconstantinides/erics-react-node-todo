var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  status: String,
  order: Number
});

module.exports = mongoose.model('Todo', TodoSchema);