document.addEventListener("DOMContentLoaded", () => {
    // Remove task-container when clicked on the delete button
    const tasksList = document.querySelector('.tasks');

    tasksList.addEventListener('click', (event) => {
        const deleteButton = event
            .target
            .closest('.delete-btn');
        if (deleteButton) {
            const taskContainer = deleteButton.closest('.task-container');
            if (taskContainer) {
                taskContainer
                    .classList
                    .add('fade-out');
                setTimeout(() => {
                    taskContainer.remove();
                }, 500);
            }
        }
    });

    // Pop up and adding a new task
    const newTaskBtn = document.querySelector('.new-task-button');
    const newTaskPopup = document.querySelector('.new-task-popup');
    const submitBtn = document.getElementById('submit-btn');
    const overlay = document.querySelector('.overlay');
    const newTaskInput = document.getElementById('new-task');
    let taskIdCounter = 1;

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
            const taskId = `customCheckbox${taskIdCounter}`;
            const tasksList = document.querySelector('.tasks');
            const taskContainer = document.createElement('div');
            taskContainer
                .classList
                .add('task-container');
            taskContainer.innerHTML = `
                <input type="checkbox" name="To-do" id="${taskId} customCheckbox" class="customCheckbox">
                <label for="${taskId} customCheckbox" class="task-box">${newTaskInputValue}</label>
                <div class="task-delete delete-btn">
                    delete
                </div>
            `;
            tasksList.appendChild(taskContainer);
            taskIdCounter++;
            newTaskInput.value = '';
            newTaskPopup
                .classList
                .remove('show');
            overlay.style.display = 'none';

            // Attach event listener to the new checkbox
            const checkbox = taskContainer.querySelector('input[type="checkbox"]');
            const taskBox = taskContainer.querySelector('.task-box');

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    taskBox
                        .classList
                        .add('checked');
                } else {
                    taskBox
                        .classList
                        .remove('checked');
                }
            });
        } else {
            alert('Please enter a task!');
        }
    }

    // Toggle the label of task
    const checkboxes = document.querySelectorAll(
        '.task-container input[type="checkbox"]'
    );

    checkboxes.forEach(checkbox => {
        const taskBox = checkbox.nextElementSibling;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskBox
                    .classList
                    .add('checked');
            } else {
                taskBox
                    .classList
                    .remove('checked');
            }
        });
    });
});
