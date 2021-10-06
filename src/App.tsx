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
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValueType>("all")

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





    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    const [todolists, setTodolists] = useState <Array<TodolistsType>>([
        {
            id: v1(),
            title: "What to learn",
            filter: "active"
        },
        {
            id: v1(),
            title: "What to buy",
            filter: "active"
        }
    ])

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasks

                    if (filter === 'active') {
                        taskForTodolist = tasks.filter(t => t.isDone === false)
                    }
                    if (filter === 'completed') {
                        taskForTodolist = tasks.filter(t => t.isDone === true)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={taskForTodolist}
                            addTask={addTask}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeTaskStatus={changeStatus}
                            changeFilter={changeFilter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
