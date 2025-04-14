const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.priority.toLowerCase()}`;
    li.innerHTML = `
      <strong>${task.text}</strong> <br/>
      Due: ${task.dueDate || "None"} | Priority: ${task.priority}
      <div class="task-controls">
        <button onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">❌ Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = {
    text: taskInput.value,
    dueDate: dueDateInput.value,
    priority: prioritySelect.value
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  form.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  const newText = prompt("Edit Task:", task.text);
  if (newText !== null) {
    task.text = newText;
    const newDate = prompt("Edit Due Date (YYYY-MM-DD):", task.dueDate || "");
    if (newDate !== null) task.dueDate = newDate;
    const newPriority = prompt("Edit Priority (Low, Medium, High):", task.priority);
    if (newPriority !== null && ["Low", "Medium", "High"].includes(newPriority)) {
      task.priority = newPriority;
    }
    saveTasks();
    renderTasks();
  }
}

renderTasks(); // Initial render
