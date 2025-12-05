class Task{
    constructor(description, status){
       this.description = description;
       this.status = status;
    }
}

let tasks = [
    new Task('pack spikes for track meet', 'todo'), 
    new Task('make my bed', 'todo'), 
    new Task('walk the dog', 'todo'),
    new Task('write draft english paper', 'doing'),
    new Task('sanding art project', 'doing'),
    new Task('wash the dishes', 'done'),
    new Task('finish math homework', 'done'),
    new Task('practice my trumpet', 'done')];
            
function drawCard(index, task){
    return `<div id="task-${index}" class="card">
        <div class="task-menu">
            <div class="menu-bar  ${task.status}">...</div>
            <ul class="task-menu-items">
                <li><a href="/edit/${index}">Edit</a></li>
                <li><a href="/delete/${index}">Delete</a></li>
            </ul>
        </div>
        ${task.description}
    </div>`
}

function drawTodoCards(){
    let output = '';
    tasks.forEach((task, index) => {
        if(task.status == 'todo'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}

function drawDoingCards(){
    let output = '';
    
    tasks.forEach((task, index) => {
        if(task.status == 'doing'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}



function drawDoneCards(){
    let output = '';
    
    tasks.forEach((task, index) => {
        if(task.status == 'done'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}

function drawAllCards(){
    document.getElementById('todo-cards').innerHTML = drawTodoCards();
    document.getElementById('doing-cards').innerHTML = drawDoingCards();
    document.getElementById('done-cards').innerHTML = drawDoneCards();
}

drawAllCards();

// handle adding a new task from the form without reloading the page
const addBtn = document.getElementById('add-task');
if(addBtn){
    addBtn.addEventListener('click', function(e){
        e.preventDefault();
        const descInput = document.getElementById('task-description');
        const statusInput = document.getElementById('task-status');
        const description = descInput ? descInput.value.trim() : '';
        const status = statusInput ? statusInput.value : 'todo';

        if(description.length === 0) return;

        const newTask = new Task(description, status);
        tasks.push(newTask);
        drawAllCards();

        if(descInput) descInput.value = '';
    });
}
