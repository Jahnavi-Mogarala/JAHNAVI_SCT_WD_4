document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const userCode = document.getElementById("userCode").value;
  document.getElementById("profileInfo").innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Code:</strong> ${userCode}</p>
  `;
});

let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("taskDate").value;

  if (title && date) {
    tasks.push({ title, description, date, completed: false });
    displayTasks();
  }
}

function displayTasks(filtered = 'all') {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    if (filtered === 'completed' && !task.completed) return;
    if (filtered === 'pending' && task.completed) return;

    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
      <strong>${task.title}</strong> - ${task.description}<br/>
      Due: ${new Date(task.date).toLocaleString()}<br/>
      <button onclick="toggleTask(${i})">${task.completed ? 'Mark Pending' : 'Mark Done'}</button>
      <button onclick="deleteTask(${i})">Delete</button>
    `;
    list.appendChild(taskDiv);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function filterTasks(type) {
  displayTasks(type);
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

let timer;
function startTimer() {
  const minutes = parseInt(document.getElementById("timerMinutes").value);
  if (!minutes || minutes <= 0) return;

  let secondsLeft = minutes * 60;
  timer = setInterval(() => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    document.getElementById("timerDisplay").innerText = `${min}m ${sec}s`;
    secondsLeft--;
    if (secondsLeft < 0) {
      clearInterval(timer);
      alert("Timer ended!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById("timerDisplay").innerText = "";
}
