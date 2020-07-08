//Selectors
const todoFormInput = document.querySelector('.todo-form__input');
const todoFormBtn = document.querySelector('.todo-form__btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-form__select');

//Events
document.addEventListener("DOMContentLoaded", getTasks);
todoFormBtn.addEventListener("click", addTask);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTasks);

//Function
function addTask(e, local = false, task) {
    let idTask = (new Date()).getTime(),
        title =  local ? task.title : todoFormInput.value;

    !local ? e.preventDefault() : ''; 
    
    if (title === '')
        return false;

    // CREATE ITEM TASK
    const taskDiv = document.createElement('li');
    taskDiv.classList.add('todo-list-item');
    // CREATE TITLE TASK
    const newTask = document.createElement('div');
    newTask.classList.add('todo-list-item__title');
    newTask.innerText = title;
    taskDiv.appendChild(newTask);
    // Check local save or simple
    if (!local) {
        taskDiv.id = idTask;
        saveLocalTask(title, idTask)
    } 
    // CREATE TITLE TASK
    const completedBtn = document.createElement('div');
    completedBtn.classList.add('todo-list-item__btn-completed');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    const trashBtn = document.createElement('div');
    trashBtn.classList.add('todo-list-item__btn-trash');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

    taskDiv.appendChild(completedBtn);
    taskDiv.appendChild(trashBtn);

    todoList.append(taskDiv);

    !local ? todoFormInput.value = '' : '';
}

function deleteCheck(e) {
    const item = e.target;
    //Delete task
    if (item.classList[0] === 'todo-list-item__btn-trash') {
        const todo = item.parentElement;
        todo.classList.add('todo-list-item--remove');
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    //complited task
    if (item.classList[0] === 'todo-list-item__btn-completed') {
        const todo = item.parentElement;
        todo.classList.add('todo-list-item--completed');
    }
}

function filterTasks(e) {
    const selected = 'todo-list--' + e.target.value,
        options = [...e.target.children];
    //remove classes
    options.forEach(option => {
        todoList.classList.remove('todo-list--' + option.value);
    });
    //filter value added to class
    todoList.classList.add(selected);
}


function checkLocalItem(name) {
    let items;

    if (localStorage.getItem(name) === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem(name));
    }

    return items;
}

function saveLocalTask(titleTask, idTask) {
    tasks = checkLocalItem('tasks');

    let item = {
        id: idTask,
        title: titleTask,
        completed: false
    }
    tasks.push(item);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    tasks = checkLocalItem('tasks');

    tasks.forEach(task => {
        addTask(false, true, task);
    })
}

