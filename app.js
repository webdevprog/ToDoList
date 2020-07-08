//Selectors
const todoFormInput = document.querySelector('.todo-form__input');
const todoFormBtn = document.querySelector('.todo-form__btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-form__select');

//Events
todoFormBtn.addEventListener("click", addTask);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("change", filterTasks);

//Function
function addTask(e) {
    e.preventDefault();
    if (todoFormInput.value === '') {
        return false;
    } 
    // CREATE ITEM TASK
    const taskDiv = document.createElement('li');
    taskDiv.classList.add('todo-list-item');
    // CREATE TITLE TASK
    const newTask = document.createElement('div');
    newTask.classList.add('todo-list-item__title');
    newTask.innerText = todoFormInput.value;
    taskDiv.appendChild(newTask);
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

    todoFormInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //Delete task
    if (item.classList[0] === 'todo-list-item__btn-trash') {
        const todo = item.parentElement;
        todo.classList.add('todo-list-item--remove');
        todo.addEventListener("transitionend", function() {
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
    const selected = 'todo-list--'+e.target.value,
          options = [...e.target.children];

    options.forEach(option => {
        todoList.classList.remove('todo-list--'+option.value);  
    });

    todoList.classList.add(selected);
}

