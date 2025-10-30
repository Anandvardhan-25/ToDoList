// backend/routes/todo.routes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');

// ✅ GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate
  });

  try {
    await todo.save();
    res.status(201).json({ message: 'Todo created successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE todo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE todo by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
