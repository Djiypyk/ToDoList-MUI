import {TasksStateType} from "../App";
import {createTodolistAC, getTodosAC, removeTodoListAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStateAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'GET-TASKS' : {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .filter(t => t.id !== action.taskID)
            }
        }
        case 'UPDATE-TASK-STATUS': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-NEW-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'GET_TODOLIST':
            const stateCopy = {...state}
            action.todos.forEach((t) => {
                stateCopy[t.id] = []
            })
            return stateCopy
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state

    }
}

///Action Creator

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (taskID: string, todoListID: string) => ({type: 'REMOVE-TASK', taskID, todoListID} as const)
export const updateTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) => ({
    type: 'UPDATE-TASK-STATUS',
    taskID,
    status,
    todoListID
} as const)
export const updateTaskTitleAC = (taskID: string, title: string, todoListID: string) => ({
    type: 'UPDATE-TASK-TITLE',
    taskID,
    title,
    todoListID
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'GET-TASKS',
    todolistId,
    tasks
} as const)

//Thunk

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStateAC('succeeded'))
        })
}

export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStateAC('succeeded'))
        })
}

export const createTasksTC = (title: string, todoIt: string) => (dispatch: Dispatch) => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.createTask(todoIt, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStateAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const updateTasksStatusTC = (
    taskID: string,
    status: TaskStatuses,
    todoListID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todoListID].find((t) => t.id === taskID)

    if (currentTask) {
        const apiModel: UpdateTaskType = {
            title: currentTask.title,
            status,
            deadline: currentTask.deadline,
            completed: currentTask.completed,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate

        }
        dispatch(setAppStateAC('loading'))
        todolistsAPI.updateTask(todoListID, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskStatusAC(taskID, status, todoListID))
                    dispatch(setAppStateAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)

            })
    }
}

export const updateTasksTitleTC = (
    taskID: string,
    title: string,
    todoListID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todoListID].find((t) => t.id === taskID)

    if (currentTask) {
        const model: UpdateTaskType = {
            title: title,
            status: currentTask.status,
            deadline: currentTask.deadline,
            completed: currentTask.completed,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate

        }
        dispatch(setAppStateAC('loading'))
        todolistsAPI.updateTask(todoListID, taskID, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskTitleAC(taskID, title, todoListID))
                    dispatch(setAppStateAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)

            })
    }
}

// Types

export type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskStatusAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setAppStateAC>
