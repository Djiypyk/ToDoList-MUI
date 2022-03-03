import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolistCallback = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" value={title} placeholder={'Title new todolist'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolistCallback}>Create TodoList</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodoListId] = useState<string>('')

    const deleteTodolistCallback = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" value={todolistId} placeholder={'Todolist ID'} onChange={(e) => {
                setTodoListId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolistCallback}>Delete TodoList</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const upgradeTodolistCallback = () => {
        todolistsAPI.updateTodolistTitle(title, todoListId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" value={todoListId} placeholder={'Upgrading Todolist'} onChange={(e) => {
                setTodoListId(e.currentTarget.value)
            }}/>
            <input type="text" value={title} placeholder={'New Title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={upgradeTodolistCallback}>Upgrade TodoList</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>("")

    const getTaskCallback = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}

        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} type="text"/>
            <button onClick={getTaskCallback}>Create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>("")
    const [todolistId, setTodolistId] = useState<any>("")

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} type="text"/>
            <button onClick={deleteTask}>Delete</button>
        </div>
    </div>
}

//////////confirm task request//////////////////

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>("")
    const [todolistId, setTodolistId] = useState<any>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'task title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }} type="text"/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>("")
    const [taskDesc, setTaskDesc] = useState<any>("")
    const [taskStatus, setTaskStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [todolistId, setTodolistId] = useState<any>("")
    const [taskId, setTaskId] = useState<any>("")

    const updateTaskCallback = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: taskDesc,
            priority: priority,
            startDate: startDate,
            status: taskStatus,
            title: taskTitle,
            completed: false
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolist Id'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'task id'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'task title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'task description'} value={taskDesc} onChange={(e) => {
                setTaskDesc(e.currentTarget.value)
            }} type="text"/>
            <input placeholder={'task status'} value={taskStatus} onChange={(e) => {
                setTaskStatus(+e.currentTarget.value)
            }} type="number"/>
            <input placeholder={'task priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }} type="number"/>
            <button onClick={updateTaskCallback}>Create task</button>
        </div>
    </div>
}