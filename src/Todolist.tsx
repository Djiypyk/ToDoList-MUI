import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const keyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }


    const changeFiltersHandler = (valueFilter: FilterValuesType) => {
        props.changeFilter(valueFilter)
    }



    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={keyDownAddTask}/>
                <button onClick={onClickHandler}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeHandler = () => props.removeTask(t.id)
                    return  <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeHandler}>x
                        </button>
                    </li>})
                }
            </ul>
            <div>
                <button onClick={() => changeFiltersHandler('all')}>
                    All
                </button>
                <button onClick={() => changeFiltersHandler('active')}>
                    Active
                </button>
                <button onClick={() => changeFiltersHandler('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}

