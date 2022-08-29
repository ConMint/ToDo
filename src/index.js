import _ from 'lodash';
import '/src/style.css'
import { addProject, showProjects, addProjBtn,} from './createProject';
import {appendAddTask,addTask,tasklist, showTasks,showTodaysTasks} from './createTask.js';

const currentProj = document.querySelector('.currentProj');
currentProj.innerText = 'All Tasks';

showProjects();

document.addEventListener('click', function checkClick(event) {
    const main = document.querySelector('.main');
    const isProj = event.target.classList.contains('indivProject');
    const isHome = event.target.classList.contains('subHeaders')
    if (isProj === true && document.getElementById('addTaskBtn') === null) {
        showTasks();
        appendAddTask();
    }  else if (isHome === true) {
        main.removeChild(addTaskBtn);
        
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
    currentProj.innerText = "Today's Tasks";
    
});

addProjBtn.addEventListener('click',addProject);

const sidebarIcon = document.getElementById('sidebarIcon');
const sidebar = document.querySelector('.sidebar');

sidebarIcon.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
})

