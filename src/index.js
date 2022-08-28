import _ from 'lodash';
import '/src/style.css'
import { addProject, showProjects, addProjBtn,} from './createProject';



showProjects();





addProjBtn.addEventListener('click',addProject);

const sidebarIcon = document.getElementById('sidebarIcon');
const sidebar = document.querySelector('.sidebar');

sidebarIcon.addEventListener('click', () => {
    console.log('clikka');
    sidebar.classList.toggle('hidden');
})

