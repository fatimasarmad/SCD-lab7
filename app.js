const express = require('express');
const tasks = require('./task');
const users = require('./user');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/tasks', (req, res) => 
{
  const { title, description, dueDate, category, priority, userId } = req.body;
  
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    dueDate,
    category,
    priority,
    completed: false,
    userId
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id/completed', (req, res) =>
 {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].completed = true;
  res.json(tasks[taskIndex]);
});


app.get('/tasks', (req, res) =>
{
 res.json(tasks);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      res.json({ message: "Logged in"});
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
