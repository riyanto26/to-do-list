// DOM Elements
const form = document.getElementById('todoForm');
const taskNameInput = document.getElementById('taskName');
const taskDescriptionInput = document.getElementById('taskDescription');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');

// Load Tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
});

// Add Task
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const task = {
    id: Date.now(),
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    completed: false
  };

  addTaskToDOM(task);
  saveTaskToLocalStorage(task);

  // Reset Form
  form.reset();
});

// Add Task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = `todo-item ${task.completed ? 'completed' : ''}`;
  li.setAttribute('data-id', task.id);

  li.innerHTML = `
    <div>
      <strong>${task.name}</strong><br>
      <small>${task.description}</small>
    </div>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  todoList.appendChild(li);
}

// Save Task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Handle Task Actions (Complete/Delete)
todoList.addEventListener('click', (event) => {
  const taskId = event.target.closest('.todo-item').dataset.id;

  if (event.target.classList.contains('complete-btn')) {
    toggleComplete(taskId);
  } else if (event.target.classList.contains('delete-btn')) {
    deleteTask(taskId);
  }
});

// Toggle Task Completion
function toggleComplete(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(task => task.id == taskId);
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Update DOM
  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  taskElement.classList.toggle('completed');
}

// Delete Task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id != taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remove from DOM
  document.querySelector(`[data-id="${taskId}"]`).remove();
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});
