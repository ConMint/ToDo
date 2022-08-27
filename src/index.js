import _ from 'lodash';
import '/src/style.css'


const sidebarIcon = document.getElementById('sidebarIcon');
const sidebar = document.querySelector('.sidebar');

sidebarIcon.addEventListener('click', () => {
    console.log('clikka');
    sidebar.classList.toggle('sidebar');
    sidebar.classList.toggle('hidden');
})