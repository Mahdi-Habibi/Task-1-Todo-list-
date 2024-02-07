document.addEventListener("DOMContentLoaded", () => {
    const tasksList = document.querySelector('.tasks');
    let tasks = [];

    // Load tasks from local storage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            tasksList.appendChild(createTaskElement(task));
        });
    }
    // Remove task-container when clicked on the delete
    tasksList.addEventListener('click', (event) => {
        const deleteButton = event
            .target
            .closest('.delete-btn');
        if (deleteButton) {
            const taskContainer = deleteButton.closest('.task-container');
            if (taskContainer) {
                const taskId = taskContainer.dataset.taskId;
                tasks = tasks.filter(task => task.id !== taskId);
                taskContainer
                    .classList
                    .add('fade-out');
                setTimeout(() => {
                    taskContainer.remove();
                    saveTasksToLocalStorage();
                }, 500);
            }
        }
    });
    // Pop up and adding a new task
    const newTaskBtn = document.querySelector('.new-task-button');
    const newTaskPopup = document.querySelector('.new-task-popup');
    const overlay = document.querySelector('.overlay');
    const newTaskInput = document.getElementById('new-task');

    newTaskBtn.addEventListener('click', (event) => {
        event.preventDefault();
        overlay.style.display = 'block';
        newTaskInput.focus();
        setTimeout(() => {
            newTaskPopup
                .classList
                .add('show');
        }, 10);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.new-task-popup') && event.target !== newTaskBtn) {
            newTaskPopup
                .classList
                .remove('show');
            overlay.style.display = 'none';
        }
    });

    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', addTask);

    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const newTaskInputValue = newTaskInput
            .value
            .trim();
        if (newTaskInputValue !== '') {
            const task = {
                id: `task${Date.now()}`,
                name: newTaskInputValue,
                checked: false
            };
            tasks.push(task);
            tasksList.appendChild(createTaskElement(task));
            saveTasksToLocalStorage();
            newTaskInput.value = '';
            newTaskPopup
                .classList
                .remove('show');
            overlay.style.display = 'none';
        } else {
            alert('Please enter a task!');
        }
    }
    // Attach event listener to the new checkbox
    function createTaskElement(task) {
        const taskContainer = document.createElement('div');
        taskContainer
            .classList
            .add('task-container');
        taskContainer.dataset.taskId = task.id;
        taskContainer.innerHTML = `
            <input type="checkbox" name="To-do" id="${task.id}" class="customCheckbox" ${task.checked
            ? 'checked'
            : ''}>
            <label for="${task.id}" class="task-box">${task.name}</label>
            <div class="task-delete delete-btn">
                delete
            </div>
        `;
        const checkbox = taskContainer.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.checked = checkbox.checked;
            saveTasksToLocalStorage();
            if (checkbox.checked) {
                taskContainer
                    .querySelector('.task-box')
                    .classList
                    .add('checked');
            } else {
                taskContainer
                    .querySelector('.task-box')
                    .classList
                    .remove('checked');
            }
        });
        return taskContainer;
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Toggle the label of task
    const existingCheckboxes = document.querySelectorAll(
        '.task-container input[type="checkbox"]'
    );
    existingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const taskBox = checkbox.nextElementSibling;
            if (checkbox.checked) {
                taskBox
                    .classList
                    .add('checked');
            } else {
                taskBox
                    .classList
                    .remove('checked');
            }
            const taskId = checkbox.parentElement.dataset.taskId;
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].checked = checkbox.checked;
                saveTasksToLocalStorage();
            }
        });
    });
});
