// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://Anandvardhan:Anand_2525@cluster0.lmkmxfu.mongodb.net/todoDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Import Routes
const todoRoutes = require('./routes/todo.routes');
app.use('/api/todos', todoRoutes); // ✅ Important!

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the ToDo API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
