// backend/models/todo.model.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  dueDate: Date,
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
