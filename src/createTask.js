import { differenceInCalendarDays } from 'date-fns';

// used in some functions
let objIndex = null;
let oldPP = null;

//form functions
function openTheForm() {
  document.getElementById('popupForm').style.display = 'block';
  document.getElementById('page-mask').style.display = 'block';
  document.getElementById('newTaskPop').style.display = 'block';
}

function closeTheForm() {
  document.getElementById('popupForm').style.display = 'none';
  document.getElementById('page-mask').style.display = 'none';
  document.getElementById('newTaskPop').style.display = 'none';
}

document.querySelector('.cancelBtn').addEventListener('click', () => {
  form.reset();
  closeTheForm();
});

const currentProj = document.querySelector('.currentProj');
// prevent early submit of form
document.getElementById('submit').addEventListener('click', function (event) {
  if (document.getElementById('form').checkValidity()) {
    event.preventDefault();
    addTask();
    localStorage.setItem('storedTasks', JSON.stringify(tasklist));
  }
});

//appends add task button only on project screens
function appendAddTask() {
  const main = document.querySelector('.main');
  const addTaskBtn = document.createElement('button');
  addTaskBtn.setAttribute('id', 'addTaskBtn');
  addTaskBtn.innerText = 'Add Task';
  main.appendChild(addTaskBtn);
  addTaskBtn.addEventListener('click', () => {
    openTheForm();
  });
}

//placeholder tasks
let tasklist = [
  {
    title: 'Walk Dog',
    description: 'Take dog out',
    dueDate: '2022-09-03',
    priority: 'Not important',
    parentProj: 'Everyday Tasks',
  },
  {
    title: 'Walk Cat',
    description: 'Take cat out',
    dueDate: '2022-09-19',
    priority: 'Important',
    parentProj: 'Fun Tasks',
  },
];

class Task {
  constructor(title, description, dueDate, priority, parentProj) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentProj = parentProj;
  }
}

// function to add task, opens the form and allows editing and inserting at original position
function addTask() {
  const title = form.title.value;
  const description = form.details.value;
  const dueDate = form.date.value;

  const priority = form.priority.value;
  let parentProj;

  if (oldPP === null) {
    parentProj = currentProj.innerText;
  } else {
    parentProj = oldPP;
    oldPP = null;
  }

  const taskToAdd = new Task(title, description, dueDate, priority, parentProj);
  if (objIndex === null) {
    tasklist.push(taskToAdd);
    showProjectTasks();
    form.reset();
    closeTheForm();
  } else {
    tasklist.splice(objIndex, 1, taskToAdd);
    objIndex = null;
    if (currentProj.innerText === 'All Tasks') {
      showTasks();
    } else if (currentProj.innerText === 'Today') {
      showTodaysTasks();
    } else if (currentProj.innerText === 'Next 7 Days') {
      showWeekTasks;
    } else if (currentProj.innerText === 'Important') {
      showImportantTasks();
    } else {
      showProjectTasks();
    }
    form.reset();
    closeTheForm();
  }
}

// functions to show relevant tasks when selecting options in sidebar
function showTasks() {
  listOfTasks.innerHTML = '';

  for (let i = 0; i < tasklist.length; i++) {
    createTask(tasklist[i]);
  }
}

function showTodaysTasks() {
  listOfTasks.innerHTML = '';

  for (let i = 0; i < tasklist.length; i++) {
    if (isToday(new Date(tasklist[i].dueDate)) === true) {
      createTask(tasklist[i]);
    }
  }
}

function showWeekTasks() {
  listOfTasks.innerHTML = '';

  for (let i = 0; i < tasklist.length; i++) {
    if (
      differenceInCalendarDays(new Date(tasklist[i].dueDate), new Date()) <=
        7 &&
      differenceInCalendarDays(new Date(tasklist[i].dueDate), new Date()) >= 0
    ) {
      createTask(tasklist[i]);
      console.log(
        differenceInCalendarDays(new Date(tasklist[i].dueDate), new Date())
      );
    }
  }
}

function showProjectTasks() {
  listOfTasks.innerHTML = '';

  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].parentProj === currentProj.innerText) {
      createTask(tasklist[i]);
    }
  }
}

function showImportantTasks() {
  listOfTasks.innerHTML = '';

  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].priority === 'Important') {
      createTask(tasklist[i]);
    }
  }
}

// function to delete all project tasks when deleting a project
export default function deleteProjectTasks() {
  let i = tasklist.length;
  while (i--) {
    if (tasklist[i].parentProj === currentProj.innerText) {
      tasklist.splice(tasklist[i], 1);
    }
    localStorage.setItem('storedTasks', JSON.stringify(tasklist));
  }
}

function createTask(item) {
  const listOfTasks = document.getElementById('listOfTasks');

  const newTask = document.createElement('div');
  newTask.classList.add('indivTask');
  const taskTitle = document.createElement('div');
  taskTitle.textContent = item.title;
  taskTitle.setAttribute('id', 'taskTitle');
  const titleAndDesc = document.createElement('div');
  titleAndDesc.classList.add('titleAndDesc');
  const taskDesc = document.createElement('div');
  taskDesc.textContent = item.description;
  taskDesc.setAttribute('id', 'taskDesc');
  const taskDate = document.createElement('div');
  taskDate.textContent = item.dueDate;
  taskDate.setAttribute('id', 'taskDate');
  const taskPriority = document.createElement('button');
  taskPriority.textContent = item.priority;
  taskPriority.setAttribute('id', 'taskPriority');
  titleAndDesc.appendChild(taskTitle);
  titleAndDesc.appendChild(taskDesc);

  if (item.priority === 'Important') {
    newTask.classList.add('important');
  }

  newTask.setAttribute('parent-project', item.parentProj);
  const delBtn = document.createElement('button');
  delBtn.classList.add('taskBtns');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    if (currentProj.innerText === 'All Tasks') {
      tasklist.splice(tasklist.indexOf(item), 1);
      showTasks();
    } else if (currentProj.innerText === 'Today') {
      tasklist.splice(tasklist.indexOf(item), 1);
      showTodaysTasks();
    } else if (currentProj.innerText === 'Next 7 Days') {
      tasklist.splice(tasklist.indexOf(item), 1);
      showWeekTasks;
    } else if (currentProj.innerText === 'Important') {
      tasklist.splice(tasklist.indexOf(item), 1);
      showImportantTasks();
    } else {
      tasklist.splice(tasklist.indexOf(item), 1);
      showProjectTasks();
    }
    localStorage.setItem('storedTasks', JSON.stringify(tasklist));
  });
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('taskBtns');
  editBtn.addEventListener('click', () => {
    objIndex = tasklist.indexOf(item);

    openTheForm();
    form.title.value = item.title;
    form.details.value = item.description;
    form.date.value = item.dueDate;
    form.priority.value = item.priority;
    oldPP = item.parentProj;
    localStorage.setItem('storedTasks', JSON.stringify(tasklist));
  });

  newTask.appendChild(titleAndDesc);
  newTask.appendChild(taskDate);
  newTask.appendChild(editBtn);
  newTask.appendChild(delBtn);
  newTask.appendChild(taskPriority);

  taskPriority.addEventListener('click', () => {
    newTask.classList.toggle('important');
    if (taskPriority.textContent === 'Important') {
      taskPriority.textContent = 'Not important';
      item.priority = 'Not important';
      localStorage.setItem('storedTasks', JSON.stringify(tasklist));
    } else {
      taskPriority.textContent = 'Important';
      item.priority = 'Important';
      localStorage.setItem('storedTasks', JSON.stringify(tasklist));
    }
    if (currentProj.innerText === 'Important') {
      showImportantTasks();
    }
  });

  listOfTasks.appendChild(newTask);
}

// Function to get today's date for Show Todays Tasks
function isToday(date) {
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  } else return false;
}

export {
  appendAddTask,
  tasklist,
  showTasks,
  showTodaysTasks,
  showProjectTasks,
  showImportantTasks,
  showWeekTasks,
};
