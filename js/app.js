// remove task-container when clicks on the delet button
document.addEventListener("DOMContentLoaded", () => {
    const tasksList = document.querySelector('.tasks');

    tasksList.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.delete-btn');
        if (deleteButton) {
            const taskContainer = deleteButton.closest('.task-container');
            if (taskContainer) {
                taskContainer.classList.add('fade-out');
                taskContainer.remove();
            }
        }
    });
});


// pop up and addinga new task
document.addEventListener('DOMContentLoaded', () => {
    const newTaskButton = document.querySelector('.new-task-button');
    const newTaskPopup = document.querySelector('.new-task-popup');
    const submitButton = document.getElementById('submitBtn');
    const tasksList = document.querySelector('.tasks');
    const overlay = document.querySelector('.overlay');
    const newTaskInput = document.getElementById('newTask');
    let taskIdCounter = 1;

    newTaskButton.addEventListener('click', (event) => {
        event.preventDefault();
        newTaskPopup.style.display = 'block';
        overlay.style.display = 'block';
        newTaskInput.focus();
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.new-task-popup') && event.target !== newTaskButton) {
            newTaskPopup.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    submitButton.addEventListener('click', addTask);

    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const newTaskInputValue = newTaskInput.value.trim();
        if (newTaskInputValue !== '') {
            const taskId = `customCheckbox${taskIdCounter}`;
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');
            taskContainer.innerHTML = `
                <input type="checkbox" name="To-do" id="${taskId}" class="customCheckbox">
                <label for="${taskId}" class="task-box">${newTaskInputValue}</label>
                <div class="task-delete delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </div>
            `;
            tasksList.appendChild(taskContainer);
            taskIdCounter++;
            newTaskInput.value = '';
            newTaskPopup.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            alert('Please enter a task!');
        }
    }
});

