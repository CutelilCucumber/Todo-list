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

    const completeTask =  (taskName) => {
        let checkedTask = _tasks.filter(task => task.getName() == taskName);
        return checkedTask[0].setComplete();
        
    }

    const serialize = () => {
        return {
            name: _name,
            tasks: _tasks.map(task => task.serialize())
        };
    };

    return { getName, getTasks, setName, addTask, removeTask, completeTask, serialize}
}

//task factory function
export function Task (name, desc, dueDate, prio) {
    // initialize private vars
    let _name = name;
    let _desc = desc;
    let _dueDate = dueDate;
    let _prio = prio;
    let _complete = false;
    
    //only retrieve name
    const getName = () => _name;
    
    //get various details,
    const getDetails = () => {
        return [_name, _desc, _dueDate, _prio]; }

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
        return _complete;
    }

    const serialize = () => {
        return {
            name: _name,
            desc: _desc,
            dueDate: _dueDate,
            prio: _prio,
            complete: _complete
        };
    };

    return { getName, getDetails, editTask, setComplete, serialize}
}




