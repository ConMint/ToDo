

const currentProj = document.querySelector('.currentProj');

function appendAddTask () {
    const main = document.querySelector('.main');
    const addTaskBtn = document.createElement('button');
    addTaskBtn.setAttribute('id','addTaskBtn');
    addTaskBtn.innerText = 'Add Task';
    main.appendChild(addTaskBtn);
    addTaskBtn.addEventListener('click',addTask);
}

let tasklist = [
    {
        title: 'Walk Dog',
        description: 'Take dog oot',
        dueDate: 'Today',
        priority: 'Not important',
        parentProj: 'Everyday Tasks'
    },
    {
        title: 'Walk Cat',
        description: 'Take cat oot',
        dueDate: 'Tomoz',
        priority: 'Important',
        parentProj: 'Fun Tasks'
    }
];

class Task {
    constructor(title,description,dueDate,priority,parentProj) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.parentProj = parentProj;
    }
}

function addTask () {
    const title = prompt('title?');
    const description = prompt('desc?');
    const dueDate = prompt('due?');
    
    const priority = prompt('priority?');
    const parentProj = currentProj.innerText;
    const taskToAdd = new Task(title,description,dueDate.toLowerCase(),priority,parentProj);
    tasklist.push(taskToAdd);
    showTasks();
}

function showTasks () {
    listOfTasks.innerHTML = '';

    for (let i=0; i < tasklist.length;i++) {
        createTask(tasklist[i])
        
        

    }


}

function showTodaysTasks () {
    listOfTasks.innerHTML = '';
    const todayTaskList = tasklist.filter(task => task.dueDate === 'today');

    for (let i=0; i < todayTaskList.length;i++) {
        createTask(todayTaskList[i])
        
        

    }


}

function createTask (item){
    const listOfTasks = document.getElementById('listOfTasks');

    const newTask = document.createElement('div');
    newTask.classList.add('indivTask');

    newTask.textContent = item.title + item.description + item.priority + item.dueDate;
    newTask.setAttribute('parent-project',item.parentProj);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        tasklist.splice(tasklist.indexOf(item),1);
        showTasks();
        console.log(tasklist);
    })
    newTask.appendChild(delBtn);
    


   listOfTasks.appendChild(newTask)

}
export {appendAddTask,tasklist, showTasks,showTodaysTasks}