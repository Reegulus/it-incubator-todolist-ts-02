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

    let [filter, setFilter] = useState<FilterValueType>("all")

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function changeStatus (id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }





    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState <Array<TodolistsType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all"
        }
    ])



    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: false}
        ]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    let taskForTodolist = tasks[tl.id]

                    if (filter === 'active') {
                        taskForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                    }
                    if (filter === 'completed') {
                        taskForTodolist = allTodolistTasks.filter(t => t.isDone === true)
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
