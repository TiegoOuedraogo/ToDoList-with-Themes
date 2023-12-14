# Themed To-Do List Application

## Description
This application combines a to-do list with customizable themes, allowing users to keep track of their tasks while enjoying a personalized interface. The user can change the background color to any color they prefer, making the task management experience more enjoyable.

## Features
- Add tasks to a dynamic to-do list.
- Delete tasks from the list.
- Personalize the application's theme by changing the background color.
- The chosen theme color is saved and persisted across browser sessions using `localStorage`.
- Responsive design: the application responds to window resizing events, logging the new size.

## Usage
- To add a task, type it into the input box and either click the 'Add Task' button or press Enter.
- To delete a task, click the 'Delete' button next to it.
- To change the application's theme, use the color picker to select a new background color. The selected color immediately applies to the background and is saved for future visits.
- Resizing the browser window will trigger console logs of the new window dimensions, demonstrating the use of Browser Object Model (BOM) properties.

## BOM Properties and Methods Used
- `localStorage` is utilized to store and retrieve the user's theme color preference.
- `window.innerWidth` and `window.innerHeight` are used to detect and log changes in the window's dimensions.

## Technical Requirements Fulfilled
- `DocumentFragment` is used for efficiently adding tasks to the DOM (demonstrated in the `addTask` function).
- The `innerHTML`, `innerText`, and `textContent` properties are used to dynamically change the content of DOM elements.
- The `style` and `classList` properties are employed to modify the styles and classes of elements in response to user interactions.
- Event listeners are registered for various user interactions such as form submission, input changes, and button clicks.
- DOM event-based validation is implemented alongside HTML attribute validation to ensure robust form handling.
- The application is designed to be free of runtime errors, with logging to help identify issues during window resizing.

## How to Run
Open the `index.html` file in a web browser to start the application. No additional setup is required.
