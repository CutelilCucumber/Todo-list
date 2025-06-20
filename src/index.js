import "./styles.css";
import { TaskDisplay, ProjectDisplay, DeleteProject, DeleteTask, ExpandProject, ExpandTask } from "./interface.js";
import { Task, Project } from "./newItem.js";


//global variable to keep track of most recent project
let Projects = [];
let ProjectCounter = 0;
let ProjectIndex = 0;

function newProject(name){
    let project = Project(name);
    Projects.push(project);
    ProjectDisplay(project, ProjectCounter);
    
    
    //event listeners for add project and task
    document.querySelectorAll('[data-open-modal]').forEach(button => {
        button.addEventListener('click', (event) => {

            ProjectIndex = event.target.id.slice(7);
            const targetID = button.getAttribute('data-open-modal');
            const dialog = document.getElementById(targetID);
            if (dialog) dialog.showModal();
        })
    })
    //event listener for delete project
    document.getElementById('deleteProj'+ProjectCounter).addEventListener('click', (event) => {

        ProjectIndex = event.target.id.slice(10);
        Projects.splice(ProjectIndex, 1, "Deleted");
        DeleteProject(ProjectIndex);
    })
    //event listener for expand button
    document.getElementById('expand'+ProjectCounter).addEventListener('click', (event) => {

        ProjectIndex = event.target.id.slice(6);
        ExpandProject(ProjectIndex);
    })

    ProjectCounter++;
}
newProject("Uncategorized");

function newTask() {
    //check each entry for blanks except title, it is guarded with required
    let newName = document.getElementById('newName').value;
    let newDesc = document.getElementById('newDesc').value;
    let newDate = document.getElementById('newDate').value;
    let newPrio = document.getElementById('newPrio').value;
    
    let task = Task(newName, newDesc, newDate, newPrio);
    //add task to tasks array in project
    Projects[ProjectIndex].addTask(task);
   
    //some logic to update display
    TaskDisplay(task, ProjectIndex);
}



//assign some buttons for event listeners
const taskForm = document.getElementById('taskForm');
const projectForm = document.getElementById('projectForm');

//record new task when modal is submitted
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.submitter.classList.contains("saveBtn")){
    newTask();
    }

    document.getElementById('taskModal').close();
    taskForm.reset();
  });

//record new project when modal is submitted
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.submitter.classList.contains("saveBtn")){
    newProject(document.getElementById('projectName').value);
    }
    
    document.getElementById('projectModal').close();
    projectForm.reset();
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