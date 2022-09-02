

function openTheForm() {
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("page-mask").style.display = "block";
    document.getElementById("newTaskPop").style.display = "block";
  }

 openTheForm();

  
  function closeTheForm() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("page-mask").style.display = "none";
    document.getElementById("newTaskPop").style.display = "none";
  }



const currentProj = document.querySelector('.currentProj');

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
    addTask();
  });

function appendAddTask () {
    const main = document.querySelector('.main');
    const addTaskBtn = document.createElement('button');
    addTaskBtn.setAttribute('id','addTaskBtn');
    addTaskBtn.innerText = 'Add Task';
    main.appendChild(addTaskBtn);
    addTaskBtn.addEventListener('click', () => {
        openTheForm();
    });
}

let tasklist = [
    {
        title: 'Walk Dog',
        description: 'Take dog oot',
        dueDate: 'today',
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
    const title = form.title.value
    const description = form.details.value
    const dueDate = form.date.value
    
    const priority = form.priority.value
    const parentProj = currentProj.innerText;
    const taskToAdd = new Task(title,description,dueDate.toLowerCase(),priority,parentProj);
    tasklist.push(taskToAdd);
    showProjectTasks();
    form.reset();
    closeTheForm();

}

function showTasks () {
    listOfTasks.innerHTML = '';

    for (let i=0; i < tasklist.length;i++) {
        createTask(tasklist[i])
        
        

    }


}

function showTodaysTasks () {
    listOfTasks.innerHTML = '';
    // const todayTaskList = tasklist.filter(task => task.dueDate === 'today');

    for (let i=0; i < tasklist.length;i++) {
        if (tasklist[i].dueDate === 'today') {
            createTask(tasklist[i])
        }
        
        
        

    }


}

function showProjectTasks () {  
    listOfTasks.innerHTML = '';
    

    for (let i=0; i < tasklist.length;i++) {
        if (tasklist[i].parentProj === currentProj.innerText) {
            createTask(tasklist[i])
        }
        
        
        

    }

}

function showImportantTasks () {  
    listOfTasks.innerHTML = '';
    

    for (let i=0; i < tasklist.length;i++) {
        if (tasklist[i].priority === 'important') {
            createTask(tasklist[i])
        }
        
        
        

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
export {appendAddTask,tasklist, showTasks,showTodaysTasks,showProjectTasks,showImportantTasks}