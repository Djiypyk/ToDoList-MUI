import {TodoListType} from "../App";
import {v1} from "uuid";

export const CHANGE_TODO_LIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type ActionType = AddTodoListAT | RemoveTodoListAT | ChangeTodoListAT | ChangeTodoListFilter

type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
}

type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type ChangeTodoListAT = {
    type: typeof CHANGE_TODO_LIST_TITLE
    id: string
    title: string
}

export type ChangeTodoListFilter = {
    type: typeof CHANGE_TODOLIST_FILTER
    id: string
    filter: string
}


export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.id)
        case CHANGE_TODO_LIST_TITLE:
            return todoLists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case ADD_TODOLIST:
            const newTodoListID = v1()
            return [...todoLists, {id: newTodoListID, title: action.title , filter: 'all'}]
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists

    }
}

export const removeTodoListAC = (todolistID: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, id:todolistID}
}


export const changeTodoListTitleAC = (id: string, title:string): ChangeTodoListAT => {
    return {type: CHANGE_TODO_LIST_TITLE, id:id, title: title}
}

export const addTodolistAC = (title: string): AddTodoListAT => {
    return {type: ADD_TODOLIST, title}
}

export const changeTodolistFilterAC = (id:string, filter:string): ChangeTodoListFilter => {
    return {type: CHANGE_TODOLIST_FILTER, id, filter}
}