import { v1 } from "uuid";
import {TodoListType} from "../api/todolists-api";


export const CHANGE_TODO_LIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type ActionType = AddTodoListAT | RemoveTodoListAT | ChangeTodoListAT | ChangeTodoListFilter
export type FilterValuesType = "all" | "active" | "completed"


export type TodoListDomainType = TodoListType & {
 filter: FilterValuesType
}

export type AddTodoListAT = {
    type: typeof ADD_NEW_TODOLIST
    title: string
    id: string
}

export type RemoveTodoListAT = {
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
    filter: FilterValuesType
}

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (todoListsState = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoListsState.filter(tl => tl.id !== action.id)
        case CHANGE_TODO_LIST_TITLE:
            return todoListsState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case ADD_NEW_TODOLIST:
            return [...todoListsState, {id: action.id, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case CHANGE_TODOLIST_FILTER:
            return todoListsState.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoListsState

    }
}

export const removeTodoListAC = (todolistID: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, id: todolistID}
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListAT => {
    return {type: CHANGE_TODO_LIST_TITLE, id: id, title: title}
}

export const addTodolistAC = (title: string): AddTodoListAT => {
    return {type: ADD_NEW_TODOLIST, title: title, id: v1()}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilter => {
    return {type: CHANGE_TODOLIST_FILTER, id, filter}
}
