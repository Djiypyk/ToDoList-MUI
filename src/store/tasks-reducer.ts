import {TasksStateType} from "../App";
import {AddTodoListAT, GET_TODOLIST, GetTodolistAT, REMOVE_TODOLIST, RemoveTodoListAT} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export const REMOVE_TASK = 'REMOVE-TASK'
export const ADD_TASK = 'ADD-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const SET_TASKS = 'GET-TASKS'

type addTaskAT = {
    type: typeof ADD_TASK
    task: TaskType
}
type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    taskID: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    taskID: string
    status: TaskStatuses
    todoListID: string
}
type ChangeTaskTitleAT = {
    type: typeof CHANGE_TASK_TITLE
    taskID: string
    title: string
    todoListID: string
}
export type setTasksAT = ReturnType<typeof setTasksAC>

export type ActionType = addTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | GetTodolistAT
    | setTasksAT


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case GET_TODOLIST:
            const stateCopy = {...state}
            action.todos.forEach((t) => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case SET_TASKS : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case ADD_TASK: {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case REMOVE_TASK: {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .filter(t => t.id !== action.taskID)
            }
        }
        case CHANGE_TASK_STATUS: {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        }
        // case ADD_NEW_TODOLIST: {
        //     return {...state, [action.id]: []}
        // }
        case REMOVE_TODOLIST: {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state

    }
}

export const addTaskAC = (task: TaskType): addTaskAT => {
    return {type: ADD_TASK, task}
}
export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskID, todoListID}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusAT => {
    return {type: CHANGE_TASK_STATUS, taskID, status, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: CHANGE_TASK_TITLE, taskID, title, todoListID}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: SET_TASKS, todolistId, tasks} as const
}

//Thunk
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const createTasksTC = (title: string, todoIt: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoIt, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTasksStatusTC = (
    taskID: string,
    status: TaskStatuses,
    todoListID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todoListID].find((t) => t.id === taskID)

    // const model: UpdateTaskType = {...currentTask, status}
    if (currentTask) {
        const model: UpdateTaskType = {
            title: currentTask.title,
            status,
            deadline: currentTask.deadline,
            completed: currentTask.completed,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate

        }

        todolistsAPI.updateTask(todoListID, taskID, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskID, status, todoListID))
            })
    }
}