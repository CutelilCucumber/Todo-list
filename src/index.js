import "./styles.css";
import { inter } from "./interface.js";
import { Task, Project } from "./newItem.js";

function newProject(name){
    let project = Project(name)
    
    //some logic to update display
    //some logic to update event listener
}
newProject("Brian");

function newTask(project) {
    //check each entry for blanks except title, it is guarded with required
    let newName = document.getElementById('newName').value;
    let newDesc = document.getElementById('newDesc').checked;
    let newDate = document.getElementById('newDate').value;
    let newPrio = document.getElementById('newPrio').value;
    
    let task = Task(newName, newDesc, newDate, newPrio);
    console.log(task.getDetails());

    //some logic to update display
    //some logic for remove task event listener
}


//open the form with addbutton
document.querySelectorAll('[data-open-modal]').forEach(button => {
    button.addEventListener('click', () => {
        const targetID = button.getAttribute('data-open-modal');
        const dialog = document.getElementById(targetID);
        if (dialog) dialog.showModal();
    })
})
//assign some buttons for event listeners
const taskForm = document.getElementById('taskForm');
const projectForm = document.getElementById('projectForm');

//record new task when modal is submitted
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newTask();
    document.getElementById('taskModal').close();
  });

//record new project when modal is submitted
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newProject(document.getElementById('projectName').value);
    document.getElementById('projectModal').close();
});

//close modals if clicked out of box
document.querySelectorAll('[data-modal]').forEach(modal => {
    modal.addEventListener('click', e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })
});