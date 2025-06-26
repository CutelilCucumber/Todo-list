import "./styles.css";
import { TaskDisplay, ProjectDisplay, DeleteProject, DeleteTask, ExpandProject, ExpandTask, CompleteTask, ChangeTask } from "./interface.js";
import { Task, Project } from "./newItem.js";


//global variable to keep track of most recent project
let Projects = [];
let ProjectCounter = 0;
let ProjectIndex = 0;
let TaskToEdit = null;
let newKey = null;

let Initializing = true;
//assign modals to variables
const taskForm = document.getElementById('taskForm');
const projectForm = document.getElementById('projectForm');

if (localStorage.getItem !== null) {
    loadData();
}
Initializing = false;

function saveData() {
    //save project array to localStorage
    let rawData = Projects.map(project => {
        if (project.serialize) {
            return project.serialize();
        };
    });
    localStorage.setItem("localStore", JSON.stringify(rawData));
}

function loadData() {
    //
    let rawData = JSON.parse(localStorage.getItem("localStore")) || [];

    rawData.forEach(projectData => {
        if (projectData){
        newProject(projectData.name); // calls your function that updates the interface & pushes to Projects
        
    
        const taskList = projectData.tasks || [];

        taskList.forEach(taskData => {
            document.getElementById('newName').value = taskData.name;
            document.getElementById('newDesc').value = taskData.desc;
            document.getElementById('newDate').value = taskData.dueDate;
            document.getElementById('newPrio').value = taskData.prio;
            console.log("Loaded task from storage:", taskData)
            newTask(taskData.complete);
        
    });
}
  });
};

document.querySelectorAll('[data-open-modal]').forEach(button => {
        button.addEventListener('click', (event) => {

            ProjectIndex = event.target.id.slice(7);
            const targetID = button.getAttribute('data-open-modal');
            const dialog = document.getElementById(targetID);
            if (dialog) dialog.showModal();
        })
    })

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

        saveData();
    })
    //event listener for expand button
    document.getElementById('expand'+ProjectCounter).addEventListener('click', (event) => {

        ProjectIndex = event.target.id.slice(6);
        ExpandProject(ProjectIndex);
    })

    ProjectCounter++;

    if (Initializing === false){
    saveData();
    }
    
}

function newTask(taskComplete) {
    //check each entry for blanks except title, it is guarded with required
    let newName = document.getElementById('newName').value;
    let newDesc = document.getElementById('newDesc').value;
    let newDate = document.getElementById('newDate').value;
    let newPrio = document.getElementById('newPrio').value;
    
    let task = Task(newName, newDesc, newDate, newPrio);
    //add task to tasks array in project
    Projects[ProjectIndex].addTask(task);
   
    //some logic to update display
    let taskKey = TaskDisplay(task, ProjectIndex);
    
    //event listeners for buttons
    //event listener for delete task
    document.getElementById('delete'+taskKey).addEventListener('click', (event) => {
        DeleteTask(taskKey);
        Projects[ProjectIndex].removeTask(task.getName());

        saveData();
    })
     //event listener to complete task
    document.getElementById('complete'+taskKey).addEventListener('click', (event) => {
        let completed = Projects[ProjectIndex].completeTask(task.getName());
        CompleteTask(completed, taskKey, ProjectIndex, newPrio);
        saveData();
    })
    //event listener to simulate a click if its completed
    if (taskComplete === true) {
        document.getElementById('complete'+taskKey).click()
    }

    //event listener for to edit task info
    document.getElementById('edit'+taskKey).addEventListener('click', (event) => {
        newKey = taskKey;
        TaskToEdit = task;
        let [oldName, oldDesc, oldDate, oldPrio] = task.getDetails();

        document.getElementById('newName').value = oldName;
        document.getElementById('newDesc').value = oldDesc;
        document.getElementById('newDate').value = oldDate;
        document.getElementById('newPrio').value = oldPrio;

        taskModal.showModal(task);

    })
    //event listener for expand task details
    document.getElementById('expand'+taskKey).addEventListener('click', (event) => {

        ExpandTask(taskKey);
    })

    if (Initializing === false){
    saveData();
    }
}




//record new task when modal is submitted
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.submitter.classList.contains("saveBtn")){
        if (TaskToEdit !== null){
            let newName = document.getElementById('newName').value;
            let newDesc = document.getElementById('newDesc').value;
            let newDate = document.getElementById('newDate').value;
            let newPrio = document.getElementById('newPrio').value;
            TaskToEdit.editTask(newName, newDesc, newDate, newPrio);
            ChangeTask(newKey, TaskToEdit);
            TaskToEdit = null;
        }
        else {
            newTask();
        }
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