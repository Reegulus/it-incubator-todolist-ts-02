import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])


    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    let [filter, setFilter] = useState<"all" | "completed" | "active">("all")

    let taskForTodolist = tasks

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: "all" | "completed" | "active") {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
