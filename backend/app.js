// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET /tasks - Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /tasks - Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.promise().query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /tasks/:id - Update a task by id
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  try {
    const [result] = await db.promise().query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, taskId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id: taskId, title, description });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /tasks/:id - Delete a task by id
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const [result] = await db.promise().query(
      "DELETE FROM tasks WHERE id = ?",
      [taskId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
