import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksPropsType} from "./App";

type PropsType = {
    title: string
    id: string
    tasks: Array<TasksPropsType>
    filter: FilterValueType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    changeTaskStatus: (TaskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError("Title is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onClickAllHandler = () => {
        props.changeFilter('all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter('active')
    }
    const onClickCompletedHandler =() => {
        props.changeFilter('completed')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? 'error' : ""}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                        return (<li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input onChange={onChangeHandler}
                                       type="checkbox"
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>x
                                </button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllHandler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickActiveHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter": ""} onClick={onClickCompletedHandler}>Completed
            </button>
        </div>
    </div>
}
