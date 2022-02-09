import {TasksStateType} from "../App";
import {v1} from "uuid";
import {ADD_NEW_TODOLIST, AddTodoListAT, REMOVE_TODOLIST, RemoveTodoListAT} from "./todolist-reducer";

export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
export const REMOVE_TASK = 'REMOVE-TASK'
export const ADD_TASK = 'ADD-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

type addTaskAT = {
    type: typeof ADD_TASK
    title: string
    todoListID: string
}

type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    taskID: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: typeof CHANGE_TASK_STATUS
    taskID: string
    isDone: boolean
    todoListID: string
}

type ChangeTaskTitleAT = {
    type: typeof CHANGE_TASK_TITLE
    taskID: string
    title: string
    todoListID: string
}
export type ActionType = addTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todoListID]: [
                    newTask, ...state[action.todoListID]]
            }
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
                    .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        }
        case ADD_NEW_TODOLIST: {
            return {...state, [action.newTodoListID]: []}
        }
        case REMOVE_TODOLIST: {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            return state

    }
}

export const addTaskAC = (title: string, todoListID: string): addTaskAT => {
    return {type: ADD_TASK, title, todoListID: todoListID}
}
export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskID, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {type: CHANGE_TASK_STATUS, taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: CHANGE_TASK_TITLE, taskID, title, todoListID}
}