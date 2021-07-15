import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "React-Redux", isDone: false }
    ])
    let [filter, setFilter] = useState<'all' | 'completed' | 'active'>("all")


    function removeTask (id: number)  {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    let tasksForTodolist = tasks
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if(filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    function changeFilter(value: 'all' | 'completed' | 'active') {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
