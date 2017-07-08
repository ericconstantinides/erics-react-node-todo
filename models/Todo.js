var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  status: String
});

module.exports = mongoose.model('Todo', TodoSchema);