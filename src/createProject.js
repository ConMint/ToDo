import { indexOf } from "lodash";
import deleteProjectTasks from "./createTask";



const addProjBtn = document.getElementById('addProjBtn');
const currentProj = document.querySelector('.currentProj');


let projectList = [
    {
        name: 'Everyday Tasks',
        dataProject: 'Everyday Tasks'
    },
    {
        name: 'Fun Tasks',
        dataProject: 'Fun Tasks'
    }
];

class Project {
    constructor(name,dataProject) {
        this.name = name;
        this.dataProject = dataProject;
    }

}

function addProject () {
    const name = prompt('Project name?');
    const projToAdd = new Project(name, projectList.length);
    projectList.push(projToAdd);
    
    showProjects();
    localStorage.setItem('storedProjects',JSON.stringify(projectList))
    
    
    
    
    
}
 
 function showProjects () {

        listOfProj.innerHTML = '';
        for (let i=0; i < projectList.length;i++) {
            createProject(projectList[i]);
            
            
            
            

        }

        
            changeMain();
            
        };

    function createProject (item) {
        const listOfProj = document.getElementById('listOfProj');

        const newProj = document.createElement('div');
        newProj.classList.add('indivProject');

        newProj.textContent = item.name;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.setAttribute('id','delProjBtn')
        delBtn.addEventListener('click', () => {
            
            currentProj.innerText = item.name;
            console.log(currentProj.innerText)
            deleteProjectTasks();
            projectList.splice(projectList.indexOf(item),1);
            
            
            
            if (typeof addTaskBtn !== 'undefined') {
            document.querySelector('.main').removeChild(addTaskBtn);
            }
            document.getElementById('listOfTasks').innerHTML = '';
            
            showProjects(); 
            localStorage.setItem('storedProjects',JSON.stringify(projectList))
            
            
            

        })
        newProj.appendChild(delBtn);
        
        
        


       listOfProj.appendChild(newProj)


        
    }

    function changeMain () {
        document.querySelectorAll('.indivProject').forEach(item => {
            item.addEventListener('click', () => {
            
            currentProj.innerText = item.innerText.slice(0,-2);


            
                    
    
                }
                
                
            )
        })
    }
    


 
export {addProject, showProjects, addProjBtn, projectList}