let tasks = [];

function addTask() {
  const title = document.getElementById('taskTitle').value;
  const desc = document.getElementById('taskDescription').value;
  const date = document.getElementById('taskDate').value;

  if (!title || !date) {
    alert('Please fill out the task title and date.');
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    desc,
    date,
    completed: false
  });

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskDate').value = '';

  displayTasks();
}

function displayTasks(filter = 'all') {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
    taskDiv.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.desc}</p>
      <small>Due: ${new Date(task.date).toLocaleString()}</small>
      <div class="actions">
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    list.appendChild(taskDiv);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.desc;
    document.getElementById('taskDate').value = task.date;
    deleteTask(id);
  }
}

function filterTasks(type) {
  displayTasks(type);
}

document.getElementById('profileForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const userCode = document.getElementById('userCode').value;
  document.getElementById('profileInfo').innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>User Code:</strong> ${userCode}</p>
  `;
});
