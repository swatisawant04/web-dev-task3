document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                  
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const newTaskText = prompt('Edit task:', task.text);
            if (newTaskText) {
                task.text = newTaskText;
                saveTasks();
                renderTasks();
            }
        }
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    };

    window.toggleComplete = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    };
});
