import CheckIcon from './assets/check-square.svg';
import DownIcon from './assets/chevron-down.svg';
import UpIcon from './assets/chevron-up.svg';
import EditIcon from './assets/edit.svg';
import AddIcon from './assets/plus-square.svg';
import DeleteIcon from './assets/trash-2.svg';

export function ProjectDisplay (project, projIndex) {
    //create project container and adopt it to projects
    const projContainer = document.createElement("div");
    projContainer.setAttribute("class", "project");
    projContainer.setAttribute("id", "project"+projIndex);
    document.getElementById("projects").appendChild(projContainer);

    //create proj header and adopt to projcontainer
    const projHeader = document.createElement("span");
    projHeader.setAttribute("class", "projHeader");
    projContainer.appendChild(projHeader);

    //create proj title and adopt it to projHeader
    let newElement = document.createElement("h2");
    newElement.textContent = project.getName();
    projHeader.appendChild(newElement);

    //create an expand button and adopt to projcontainer
    newElement = document.createElement("img");
    newElement.src = UpIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("id", "expand"+projIndex);
    projHeader.appendChild(newElement);

    //create new task button and adopt to projHeader
    newElement = document.createElement("img");
    newElement.src = AddIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("data-open-modal", "taskModal")
    newElement.setAttribute("id", "newTask"+projIndex);
    projHeader.appendChild(newElement);

    //create an delete button and adopt to projHeader
    newElement = document.createElement("img");
    newElement.src = DeleteIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("id", "deleteProj"+projIndex);
    projHeader.appendChild(newElement);

    //create a tasks container and adopt to projContainer
    newElement = document.createElement("div");
    newElement.setAttribute("class", "tasks");
    newElement.setAttribute("id", "tasks"+projIndex);
    projContainer.appendChild(newElement);
}

export function TaskDisplay (task, projIndex) {
    //destructure task details
    const [taskName, taskDesc, taskDate, taskPrio, taskComplete] = task.getDetails();

    //assign the project container to a variable
    const tasks = document.getElementById("tasks"+projIndex);

    //create the taskcontainer
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");
    tasks.appendChild(taskContainer);

    //create the details display
    let newElement = document.createElement("p");
    newElement.textContent = taskName;
    taskContainer.appendChild(newElement);

    if (taskDesc !== "") {
        newElement = document.createElement("p");
        newElement.textContent = taskDesc;
        taskContainer.appendChild(newElement);
    }
    if (taskDate !== "") {
        newElement = document.createElement("p");
        newElement.textContent = taskDate;
        taskContainer.appendChild(newElement);
    }
    if (taskPrio !== "") {
        taskContainer.classList.add("prio"+taskPrio)
    }
    //create expand button
    newElement = document.createElement("img");
    newElement.src = UpIcon;
    newElement.classList.add("hoverColor");
    taskContainer.appendChild(newElement);

    //create complete button
    newElement = document.createElement("img");
    newElement.src = CheckIcon;
    newElement.classList.add("hoverColor");
    taskContainer.appendChild(newElement);

    //create edit button
    newElement = document.createElement("img");
    newElement.src = EditIcon;
    newElement.classList.add("hoverColor");
    taskContainer.appendChild(newElement);

    //create delete button
    newElement = document.createElement("img");
    newElement.src = DeleteIcon;
    newElement.classList.add("hoverColor");
    taskContainer.appendChild(newElement);

}

export function DeleteProject(projIndex) {
    //remove parent element
    document.getElementById("project"+projIndex).remove();

}

export function DeleteTask(projIndex) {

}

export function ExpandProject(projIndex) {
    //variables for tasks container and expand btton
    const expandButton = document.getElementById("expand"+projIndex);
    const tasks = document.getElementById("tasks"+projIndex);
    // hide display on contract, show on expand
    if (expandButton.src === UpIcon) {
        expandButton.src = DownIcon;
        tasks.style.display = "none";
    } else {
        expandButton.src = UpIcon;
        tasks.style.display = "block";
    }
}

export function ExpandTask(projIndex) {
    
}