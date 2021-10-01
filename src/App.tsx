import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValueType = "all" | "completed" | "active"
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    function changeStatus (TaskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === TaskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let [filter, setFilter] = useState<FilterValueType>("all")

    let taskForTodolist = tasks

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeStatus}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
