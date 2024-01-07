
const form = document.querySelector('#form')
const taskInput = document.querySelector("#taskInput")
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')


form.addEventListener('submit',addTask)
taskList.addEventListener('click',deleteTask)
taskList.addEventListener('click',doneTask)


let arrTasks = []
checkEmptyList()

if(localStorage.getItem('task')){
 arrTasks = JSON.parse(localStorage.getItem('task') )
 arrTasks.forEach(task => renderHTML(task))
}

function addTask(evt){
    evt.preventDefault()
    const textImput = taskInput.value

newTask = {
    id: Date.now(),
    text: textImput,
    done: false,
}
arrTasks.push(newTask)
renderHTML(newTask)

taskInput.value = ''
taskInput.focus()

checkEmptyList()
saveToLocalStorage()
}

function deleteTask(evt){
if(evt.target.dataset.action === 'delete'){
 const parentNode =  evt.target.closest('.list-group-item') 

 const id = Number( parentNode.id)
// const index = arrTasks.findIndex(task => task.id === id )
// arrTasks.splice(index,1)
arrTasks = arrTasks.filter(task => task.id !== id)


 parentNode.remove()
 checkEmptyList()
 saveToLocalStorage()
}
}

function doneTask(evt){
    if(evt.target.dataset.action !== 'done'){
    return
    }
    const parentNode =  evt.target.closest('.list-group-item')
    parentNode.classList.toggle('task-title--done') 
    
    const id = Number(parentNode.id)

    const task = arrTasks.find(task => task.id === id)
    task.done = !task.done

    saveToLocalStorage() 
}

function checkEmptyList(){
    if(arrTasks.length === 0){
        const emptyListHTML = `
    <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>
        `
        taskList.insertAdjacentHTML('afterbegin',emptyListHTML)

    }else{
        const emptyListMarkup = taskList.querySelector('#emptyList')
        emptyListMarkup ? emptyListMarkup.remove() : null
    }
   
} 

function saveToLocalStorage(){
    localStorage.setItem('task',JSON.stringify(arrTasks))
}

function renderHTML(task){
    const cssClass = task.done ? 'task-title task-title--done': 'task-title'

    const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class='${cssClass}'>${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`
    
    taskList.insertAdjacentHTML('beforeend',taskHTML)
}


  
