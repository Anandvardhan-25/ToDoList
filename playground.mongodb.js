/* global use, db */
// MongoDB Playground for ToDoList App

// ------------------------------
// 1️⃣ Select or create the database
// ------------------------------
use('todoDB');

// Optional: Clear existing todos (so you don't insert duplicates)
db.todos.deleteMany({});

// ------------------------------
// 2️⃣ Insert sample ToDo documents
// ------------------------------
db.todos.insertMany([
  {
    title: 'Finish Angular UI',
    description: 'Complete frontend filters and due date feature',
    status: 'pending',
    dueDate: new Date('2025-11-02'),
    dateCreated: new Date()
  },
  {
    title: 'Deploy backend on Render',
    description: 'Push Node + Express API live',
    status: 'done',
    dueDate: new Date('2025-10-30'),
    dateCreated: new Date()
  },
  {
    title: 'Create MongoDB Atlas cluster',
    description: 'Set up free M0 cluster for database',
    status: 'done',
    dueDate: new Date('2025-10-29'),
    dateCreated: new Date()
  },
  {
    title: 'Add login authentication',
    description: 'Optional user login feature',
    status: 'pending',
    dueDate: new Date('2025-10-25'),
    dateCreated: new Date()
  }
]);

// ------------------------------
// 3️⃣ View all tasks
// ------------------------------
db.todos.find().pretty();

// ------------------------------
// 4️⃣ View only completed tasks
// ------------------------------
db.todos.find({ status: 'done' });

// ------------------------------
// 5️⃣ View only pending tasks
// ------------------------------
db.todos.find({ status: 'pending' });

// ------------------------------
// 6️⃣ View overdue tasks (due date < today)
// ------------------------------
db.todos.find({ dueDate: { $lt: new Date() } });

// ------------------------------
// 7️⃣ Update one task’s status (mark as done)
// ------------------------------
db.todos.updateOne(
  { title: 'Finish Angular UI' },
  { $set: { status: 'done' } }
);

// ------------------------------
// 8️⃣ Auto-mark overdue tasks as "overdue" 🔥
// ------------------------------
const result = db.todos.updateMany(
  { dueDate: { $lt: new Date() }, status: 'pending' },
  { $set: { status: 'overdue' } }
);
console.log(`⚡ Auto-marked ${result.modifiedCount} overdue task(s).`);

// ------------------------------
// 9️⃣ Delete one completed task
// ------------------------------
db.todos.deleteOne({ title: 'Deploy backend on Render' });

// ------------------------------
// 🔟 Aggregation: Count tasks by status
// ------------------------------
db.todos.aggregate([
  { $group: { _id: '$status', count: { $sum: 1 } } }
]);

// ------------------------------
// 1️⃣1️⃣ Sort tasks by due date (nearest first)
// ------------------------------
db.todos.find().sort({ dueDate: 1 });

// ------------------------------
// 1️⃣2️⃣ Summary output
// ------------------------------
const totalTasks = db.todos.countDocuments();
const doneTasks = db.todos.countDocuments({ status: 'done' });
const pendingTasks = db.todos.countDocuments({ status: 'pending' });
const overdueTasks = db.todos.countDocuments({ status: 'overdue' });

console.log(`✅ Total Tasks: ${totalTasks}`);
console.log(`🟢 Done: ${doneTasks}`);
console.log(`🕒 Pending: ${pendingTasks}`);
console.log(`🔴 Overdue: ${overdueTasks}`);
