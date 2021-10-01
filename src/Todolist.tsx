import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksPropsType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    changeTaskStatus: (TaskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onClickAllHandler = () => {
        props.changeFilter('all')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter('active')
    }
    const onClickActiveHandler =() => {
        props.changeFilter('completed')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
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
                        return (<li key={t.id}>
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
            <button onClick={onClickAllHandler}>All
            </button>
            <button onClick={onClickActiveHandler}>Active
            </button>
            <button onClick={onClickCompletedHandler}>Completed
            </button>
        </div>
    </div>
}
