import React from 'react';
import {TasksPropsType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: number) => void
    changeFilter: (value: "all" | "completed" | "active") => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
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
