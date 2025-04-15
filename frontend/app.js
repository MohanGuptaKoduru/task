// app.js (Frontend Script)
// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
  try {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${task.title}</strong>: ${task.description}
                      <button onclick="deleteTask(${task.id})">Delete</button>`;
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading tasks:', err);
  }
}

async function createTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const task = { title, description };

  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    if (response.ok) {
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskDescription').value = '';
      loadTasks();
    } else {
      console.error('Failed to create task.');
    }
  } catch (err) {
    console.error('Error creating task:', err);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/tasks/${id}`, { method: 'DELETE' });
    if (response.ok) {
      loadTasks();
    } else {
      console.error('Failed to delete task.');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}
