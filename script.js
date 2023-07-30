// Get references to HTML elements
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Function to create a new todo item
function createTodoItem(text) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  const label = document.createElement('label');
  label.innerText = text;
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  // Handle checkbox change event to mark the item as completed
  checkbox.addEventListener('change', function () {
    label.classList.toggle('completed', this.checked);
    updateUncompletedCount(); // Update uncompleted tasks count after checkbox change
  });

  // Handle delete button click event to remove the item from the list
  deleteButton.addEventListener('click', function () {
    li.remove();
    updateUncompletedCount(); // Update uncompleted tasks count after deleting a task
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

// Handle "Add" button click event
addButton.addEventListener('click', function () {
  const taskText = input.value.trim();
  if (taskText !== '') {
    createTodoItem(taskText);
    input.value = ''; // Clear the input text after adding a task
    updateUncompletedCount(); // Update uncompleted tasks count after adding a new task
  }
});

// Handle "Enter" key press in the input box to add a task
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addButton.click();
  }
});

// Function to handle filter options
function handleFilterOption(option) {
  const allTasks = document.querySelectorAll('li');
  allTasks.forEach((task) => {
    const isCompleted = task.querySelector('.checkbox').checked;

    switch (option) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'uncompleted':
        task.style.display = isCompleted ? 'none' : 'flex';
        break;
      case 'completed':
        task.style.display = isCompleted ? 'flex' : 'none';
        break;
    }
  });
}

// Function to count uncompleted tasks
function countUncompletedTasks() {
  const allTasks = document.querySelectorAll('li');
  let count = 0;
  allTasks.forEach((task) => {
    if (!task.querySelector('.checkbox').checked) {
      count++;
    }
  });
  return count;
}

// Function to clear completed tasks
function clearCompletedTasks() {
  const completedTasks = document.querySelectorAll('li .checkbox:checked');
  completedTasks.forEach((task) => {
    task.closest('li').remove();
  });
  updateUncompletedCount(); // Update uncompleted tasks count after clearing completed tasks
}

// Function to mark all tasks as completed
function completeAllTasks() {
  const allTasks = document.querySelectorAll('li .checkbox');
  allTasks.forEach((task) => {
    task.checked = true;
    task.nextElementSibling.classList.add('completed');
  });
  updateUncompletedCount(); // Update uncompleted tasks count after marking all tasks as completed
}

// Function to update uncompleted tasks count
function updateUncompletedCount() {
  const uncompletedCount = countUncompletedTasks();
  const uncompletedCountElement = document.getElementById('uncompleted-count');
  uncompletedCountElement.textContent = `Uncompleted Tasks: ${uncompletedCount}`;
}

// Event listener for filter dropdown change
const filterDropdown = document.getElementById('filter-tasks');
filterDropdown.addEventListener('change', function () {
  const selectedOption = this.value;
  handleFilterOption(selectedOption);
});

// Event listener for "Clear Completed Tasks" button click
const clearCompletedBtn = document.getElementById('clear-completed-btn');
clearCompletedBtn.addEventListener('click', function () {
  clearCompletedTasks();
});

// Event listener for "Complete All Tasks" button click
const completeAllBtn = document.getElementById('complete-all-btn');
completeAllBtn.addEventListener('click', function () {
  completeAllTasks();
});
