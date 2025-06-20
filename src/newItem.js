//factory for projects
export function Project (name) {
    //initialize variables
    let _name = name;
    let _tasks = [];

    //logic to return specific project name
    const getName = () => { return _name; }

    const getTasks = () => { return _tasks; }

    //logic for writing new project name
    const setName = (newName) => {
        if (newName) {
            _name = newName;
        } else {
            console.error ("Project name Can't be empty");
        }
    }

    //logic to push task into tasks array of project
    const addTask = (task) => {
        _tasks.push(task);
    }

    const removeTask = (taskName) => {
        _tasks = _tasks.filter(task => task.getName() !== taskName);
    }

    return { getName, getTasks, setName, addTask, removeTask}
}

//task factory function
export function Task (name, desc, dueDate, prio) {
    // initialize private vars
    let _name = name;
    let _desc = desc;
    let _dueDate = dueDate;
    let _prio = prio;
    let _complete = false;
    
    //get various details,
    const getDetails = () => {
        return [_name, _desc, _dueDate, _prio, _complete]; }

    //remake private vars
    const editTask = (name, desc, dueDate, prio) => {
        _name = name;
        _desc = desc;
        _dueDate = dueDate;
        _prio = prio;
    }

    //change the status of complete
    const setComplete = () => {
        _complete = !_complete;
    }

    return { getDetails, editTask, setComplete}
}




