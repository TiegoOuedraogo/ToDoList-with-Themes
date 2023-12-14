document.addEventListener('DOMContentLoaded', function() {
    const newTaskForm = document.getElementById('new-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const tasksList = document.getElementById('tasks-list');
    const colorPicker = document.getElementById('color-picker');

    // Load the saved theme color from localStorage
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        colorPicker.value = savedColor;
    }

    newTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // DOM event-based validation
        if (!newTaskInput.value.trim()) {
            alert('Please enter a task.');
            return;
        }
        addTask(newTaskInput.value.trim());
        newTaskInput.value = '';
        newTaskInput.focus();
    });

    colorPicker.addEventListener('input', function() {
        document.body.style.backgroundColor = colorPicker.value;
        localStorage.setItem('themeColor', colorPicker.value); // Using BOM's localStorage
    });

    function addTask(text) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.textContent = text; // Using textContent
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            taskElement.remove();
        });

        taskElement.appendChild(deleteButton);

        // Append the taskElement directly to tasksList
        tasksList.appendChild(taskElement); 
    }

    // Additional event listener for window resize
    window.addEventListener('resize', function() {
        // Using two BOM properties
        console.log('Window resized to ' + window.innerWidth + 'x' + window.innerHeight);
    });
});
