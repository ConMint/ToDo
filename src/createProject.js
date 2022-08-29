

const addProjBtn = document.getElementById('addProjBtn');
const currentProj = document.querySelector('.currentProj');
currentProj.innerText = 'All Tasks';



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
    const projToAdd = new Project(name, name);
    projectList.push(projToAdd);
    showProjects();
    
    console.log(projectList);
    
    
}
 
 function showProjects () {

        listOfProj.innerHTML = '';
        for (let i=0; i < projectList.length;i++) {
            createProject(projectList[i])
            
            

        }
        changeMain();

    }

    function createProject (item) {
        const listOfProj = document.getElementById('listOfProj');

        const newProj = document.createElement('div');
        newProj.classList.add('indivProject');

        newProj.textContent = item.name;
        newProj.setAttribute('data-project',item.dataProject);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            projectList.splice(projectList.indexOf(item),1);
            showProjects();
        })
        newProj.appendChild(delBtn);
        


       listOfProj.appendChild(newProj)



    }

    function changeMain () {
        
        document.querySelectorAll('.indivProject').forEach(item => {
            item.addEventListener('click', () => {
                currentProj.innerText = item.innerText.slice(0,-6);
                let activeProject = currentProj.innerText;

                console.log(activeProject)
            })
        })

    }


export {addProject, showProjects, addProjBtn}