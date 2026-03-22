const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const dateInput = document.getElementById("dateInput")
// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task));

// Add task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  const date = dateInput.value;
  if (text === "") return;

  const taskObj = {
    text: text,
    date: date,
    completed: false
  };

  tasks.push(taskObj);
  saveTasks();
  renderTask(taskObj);

  input.value = "";
  dateInput.value ="";
});

// Render task
function renderTask(task) {
  const li = document.createElement("li");

  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
    <div>
      <span>${task.text}</span><br>
      <small>${task.date ? task.date : "No date"}</small>
    </div>
  `;

  // Toggle complete
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";

  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    li.remove();
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}