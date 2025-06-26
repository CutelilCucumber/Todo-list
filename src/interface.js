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
    newElement.classList.add("marginRight");
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

    //create a completed container and adopt to projContainer
    newElement = document.createElement("div");
    newElement.setAttribute("class", "completeTasks");
    newElement.setAttribute("id", "complete"+projIndex);
    projContainer.appendChild(newElement);
}

export function TaskDisplay (task, projIndex) {
    //destructure task details
    const [taskName, taskDesc, taskDate, taskPrio] = task.getDetails();

    const taskKey = crypto.randomUUID();
    //assign the project container to a variable
    const tasks = document.getElementById("tasks"+projIndex);

    //create the taskcontainer
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");
    taskContainer.setAttribute("id", taskKey);
    tasks.appendChild(taskContainer);
    taskContainer.style.backgroundColor = getPrioColor(taskPrio);
    
    //create taskHeader & taskdetails
    const taskHeader = document.createElement("div");
    taskHeader.setAttribute("class", "taskHeader");
    taskContainer.appendChild(taskHeader);

    const taskDetails = document.createElement("div");
    taskDetails.setAttribute("class", "taskDetails");
    taskDetails.setAttribute("id", "details"+taskKey);
    taskContainer.appendChild(taskDetails);

    //create the details display
    let newElement = document.createElement("p");
    newElement.textContent = taskName;
    newElement.classList.add("taskName");
    newElement.setAttribute("id", "taskName"+taskKey);
    taskHeader.appendChild(newElement);

    
        newElement = document.createElement("p");
        newElement.textContent = taskDesc;
        newElement.setAttribute("id", "taskDesc"+taskKey);
        taskDetails.appendChild(newElement);
    
    
        newElement = document.createElement("p");
        if (taskDate !== ''){
        newElement.textContent = "Due: "+taskDate;
        }
        newElement.setAttribute("id", "taskDate"+taskKey);
        taskHeader.appendChild(newElement);
    
    
        // taskContainer.classList.add("prio"+taskPrio);
    
    //create expand button
    newElement = document.createElement("img");
    newElement.src = UpIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("id", "expand"+taskKey);
    taskHeader.appendChild(newElement);

    //create complete button
    newElement = document.createElement("img");
    newElement.src = CheckIcon;
    newElement.classList.add("hoverColor");
    newElement.classList.add("marginRight");
    newElement.setAttribute("id", "complete"+taskKey);
    taskHeader.appendChild(newElement);

    //create edit button
    newElement = document.createElement("img");
    newElement.src = EditIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("id", "edit"+taskKey);
    taskHeader.appendChild(newElement);

    //create delete button
    newElement = document.createElement("img");
    newElement.src = DeleteIcon;
    newElement.classList.add("hoverColor");
    newElement.setAttribute("id", "delete"+taskKey);
    taskHeader.appendChild(newElement);

    return taskKey;
}

export function DeleteProject(projIndex) {
    //remove parent element
    document.getElementById("project"+projIndex).remove();

}

export function DeleteTask(taskKey) {
    document.getElementById(taskKey).remove();

}

export function ExpandProject(projIndex) {
    //variables for tasks container and expand btton
    const expandButton = document.getElementById("expand"+projIndex);
    const tasks = document.getElementById("tasks"+projIndex);
    const complete = document.getElementById("complete"+projIndex);
    // hide display on contract, show on expand
    if (expandButton.src === UpIcon) {
        expandButton.src = DownIcon;
        tasks.style.display = "none";
        complete.style.display = "none";
    } else {
        expandButton.src = UpIcon;
        tasks.style.display = "block";
        complete.style.display = "block";
    }
}

export function ExpandTask(taskKey) {
    //variables for tasks details and expand btton
    const expandButton = document.getElementById("expand"+taskKey);
    const task = document.getElementById("details"+taskKey);
    // hide display on contract, show on expand
    if (expandButton.src === UpIcon) {
        expandButton.src = DownIcon;
        task.style.display = "none";
    } else {
        expandButton.src = UpIcon;
        task.style.display = "block";
    }
}

export function CompleteTask(completed, taskKey, projIndex, priority) {
    
    let taskElement = document.getElementById(taskKey);
    let taskList = document.getElementById("tasks"+projIndex);
    let completelist = document.getElementById("complete"+projIndex);

    if (completed == true) {
        completelist.appendChild(taskElement);
        document.getElementById(taskKey).style.backgroundColor = "#5a85e8";
    } else {
        taskList.appendChild(taskElement);
        document.getElementById(taskKey).style.backgroundColor = getPrioColor(priority);
    }
}

export function ChangeTask (taskKey, task){
    //destructure task details
    const [taskName, taskDesc, taskDate, taskPrio] = task.getDetails();

    console.log(taskKey);
    let newElement = document.getElementById("taskName"+taskKey);
    newElement.textContent = taskName;

    newElement = document.getElementById("taskDesc"+taskKey);
    newElement.textContent = taskDesc;

    newElement = document.getElementById("taskDate"+taskKey);
    newElement.textContent = taskDate;

    newElement = document.getElementById(taskKey);
    newElement.classList.forEach(className => {
        if (className.startsWith("prio")) {
            newElement.classList.remove(className);
        }
    });

    newElement.classList.add("prio"+taskPrio);

}

function getPrioColor(prio) {
    prio = Math.max(1, Math.min(prio, 100));

    const hue = 120 - (prio -1) * (120 / 99);
    return `hsl(${hue}, 100%, 50%)`;
}