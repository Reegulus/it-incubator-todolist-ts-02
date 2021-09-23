import React, {useState} from 'react';
import {FilterValueType, TasksPropsType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    addTask: (title: string)=> void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={ (e) =>{setTitle(e.currentTarget.value)} }/>
            <button onClick={ addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                        return (<li key={t.id}>
                                <input onChange={() => {
                                }} type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {
                                    props.removeTask(t.id)
                                }}>x
                                </button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={ () => {props.changeFilter('all')}}>All</button>
            <button onClick={ () => {props.changeFilter('active')}}>Active</button>
            <button onClick={ () => {props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
}
