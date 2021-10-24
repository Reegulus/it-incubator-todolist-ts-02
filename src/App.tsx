import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
    }
function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = newTitle;
        setTasks({...tasksObj});
    }
}
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if(todolist){
        todolist.title = newTitle
        setTodolists([...todolists])
    }
}
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id != todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let todolists1 = v1()
    let todolists2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsPropsType>>( [
        {id: todolists1, title: "What to learn", filter: "all"},
        {id: todolists2, title: "What to buy", filter: "all"}
    ])



    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolists1]:
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolists2]:
        [
            {id: v1(), title: "cookies", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "laptop", isDone: false}
        ]
    })

    function AddTodolist(title: string) {
        const todolist: TodolistsPropsType = {
            id: v1(),
            filter: "all",
            title: title
        }

        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">

            <AddItemForm addItem={AddTodolist}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            addTask={addTask}
                            filter={tl.filter}
                            removeTask={removeTask}
                            tasks={tasksForTodolist}
                            changeFilter={changeFilter}
                            changeTaskTitle={changeTitle}
                            changeTaskStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
