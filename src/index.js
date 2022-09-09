import _ from 'lodash';
import '/src/style.css'
import { addProject, showProjects, addProjBtn, projectList} from './createProject';
import {appendAddTask,addTask, tasklist, showTasks,showTodaysTasks,showProjectTasks,showImportantTasks,showWeekTasks}
 from './createTask.js';




const currentProj = document.querySelector('.currentProj');
currentProj.innerText = 'Welcome back';


if (localStorage.getItem('storedTasks')) {
    const storedTasks = JSON.parse(localStorage.getItem('storedTasks'))
    tasklist = storedTasks;
    
}
if (localStorage.getItem('storedProjects')) {
    const storedProjects = JSON.parse(localStorage.getItem('storedProjects'));
    projectList = storedProjects;
    console.log('yeehaw')
}

showProjects();

document.addEventListener('click', function checkClick(event) {
    const main = document.querySelector('.main');
    const isProj = event.target.classList.contains('indivProject');
    const isHome = event.target.classList.contains('subHeaders')
    if (isProj === true && document.getElementById('addTaskBtn') === null) {
        showProjectTasks();
        appendAddTask();
    } else if (isProj === true) {
        showProjectTasks();
    } else if (isHome === true) {
        if (document.getElementById('addTaskBtn')) {
            main.removeChild(addTaskBtn);
        }
        
        
    }
})

const allTasks = document.getElementById('allTasks');
allTasks.addEventListener('click', function () {
    showTasks();
    currentProj.innerText = 'All Tasks';
    
});

const todayTasks = document.getElementById('todayTasks');
todayTasks.addEventListener('click', function () {
    showTodaysTasks();
    currentProj.innerText = "Today";
    
});

const nextWeekTasks = document.getElementById('nextWeekTasks');
nextWeekTasks.addEventListener('click', function () {
    showWeekTasks();
    currentProj.innerText = "Next 7 Days";
    
});

const importantTasks = document.getElementById('importantTasks');
importantTasks.addEventListener('click', function () {
    showImportantTasks();
    currentProj.innerText = "Important";
    
});

addProjBtn.addEventListener('click',addProject);

const sidebarIcon = document.getElementById('sidebarIcon');
const sidebar = document.querySelector('.sidebar');

sidebarIcon.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
})




  
