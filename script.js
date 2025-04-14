const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    // Sort by due date, then by priority
    tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate || "9999-12-31");
        const dateB = new Date(b.dueDate || "9999-12-31");

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        const priorityRank = { High: 1, Medium: 2, Low: 3 };
        return priorityRank[a.priority] - priorityRank[b.priority];
    });

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(`priority-${task.priority.toLowerCase()}`);
        li.innerHTML = `
            <span><strong>${task.text}</strong> - Due: ${task.dueDate || "None"} - Priority: ${task.priority}</span>
            <span>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </span>
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
    displayTasks();
    form.reset();
});

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
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
        displayTasks();
    }
}

displayTasks();
