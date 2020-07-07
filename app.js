//Selectors
const todoFormInput = document.querySelector('.todo-form__input');
const todoFormBtn = document.querySelector('.todo-form__btn');
const todoList = document.querySelector('.todo-list');

//Events
todoFormBtn.addEventListener("click", addTask);

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
    const complitedBtn = document.createElement('div');
    complitedBtn.classList.add('todo-list-item__btn-complited');
    complitedBtn.innerHTML = '<i class="fas fa-check"></i>';
    const trashBtn = document.createElement('div');
    trashBtn.classList.add('todo-list-item__btn-trash');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

    taskDiv.appendChild(complitedBtn);
    taskDiv.appendChild(trashBtn);
    
    todoList.append(taskDiv);
}

