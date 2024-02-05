// Toggle checkbox whenever gets clicked by label or by checbox iteself.
const toggleCheckbox = () => {
    const checkbox = document.getElementById("customCheckbox");
    checkbox.checked = !checkbox.checked;
}

const deleteTask = () => {
    const deletetask = document.getElementById("taskBox");
    taskBox.parentNode.removeChild(taskBox);
}