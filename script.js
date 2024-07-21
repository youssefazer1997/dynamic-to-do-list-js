document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = [];

  // Function to load tasks from Local Storage
  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = storedTasks;
    storedTasks.forEach((taskText) => addTaskToDOM(taskText));
  };

  // Function to save tasks to Local Storage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to add a task to the DOM
  const addTaskToDOM = (taskText) => {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task-item");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTask(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  };

  // Function to add a new task
  const addTask = (taskText, save = true) => {
    taskText = taskText.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    if (save) {
      tasks.push(taskText);
      saveTasks();
    }
    addTaskToDOM(taskText);
    taskInput.value = "";
  };

  // Function to remove a task
  const removeTask = (taskText) => {
    tasks = tasks.filter((task) => task !== taskText);
    saveTasks();
  };

  // Add event listener to the add button
  addButton.addEventListener("click", () => addTask(taskInput.value));

  // Add event listener for pressing the Enter key in the input field
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(taskInput.value);
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
