import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";


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
    addtask: (NewTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    console.log(title)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addtask(title);
            setTitle('');
        }
    }
    const onClickHandler = () => {
        props.addtask(title);
        setTitle('');
    }

    const changeAllFilter = (filter: FilterValuesType) => props.changeFilter(filter)

    const removeTaskHandler = (tID: string) => props.removeTask(tID)

    const addTaskHandler = () => {
        props.addtask(title);
        setTitle('')
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            {/*<button onClick={onClickHandler}>+</button>*/}
            <Button name={'+'} callback={() => addTaskHandler()}/>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    {/*<button onClick={() => props.removeTask(t.id)}>x</button>*/}
                    <Button name={'X'} callback={() => removeTaskHandler(t.id)}/>
                </li>)
            }
        </ul>
        <div>
            <Button name={'all'} callback={() => changeAllFilter('all')}/>
            <Button name={'active'} callback={() => changeAllFilter('active')}/>
            <Button name={'completed'} callback={() => changeAllFilter("completed")}/>

        </div>
    </div>
}
