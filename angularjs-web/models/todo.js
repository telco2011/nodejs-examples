//File: models/todo.js
var mongoose = require('mongoose');

var schema = new mongoose.Schema({ _id: 'string' });

module.exports = mongoose.model('Todo', schema);