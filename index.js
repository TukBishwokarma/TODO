const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const tasklist = document.getElementById('tasklist');

// Load tasks from local storage when the page loads
loadTasks();

addButton.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTasks(); // Save tasks after adding
    } else {
        alert("Please enter a task");
    }
}

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deletetask';

    listItem.appendChild(deleteButton);
    tasklist.appendChild(listItem);

    // Event listener for the delete button
    deleteButton.addEventListener('click', function() {
        tasklist.removeChild(listItem);
        saveTasks(); // Save tasks after deletion
    });
}

function saveTasks() {
    let tasks = [];
    tasklist.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement); // Load tasks from local storage
}
