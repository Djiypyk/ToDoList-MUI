import {todolistsAPI, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStateAC, SetErrorAT, SetStatusAT} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export const CHANGE_TODO_LIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const GET_TODOLIST = 'GET_TODOLIST'
export const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE-TODOLIST-ENTITY-STATUS'

export type ActionType = AddTodoListAT
    | RemoveTodoListAT
    | ChangeTodoListAT
    | ChangeTodoListFilter
    | GetTodolistAT
    | SetStatusAT
    | SetErrorAT
    | ChangeTodolistEntityStatusAT


export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
export type AddTodoListAT = {
    type: typeof ADD_NEW_TODOLIST
    todolist: TodoListType
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
export type GetTodolistAT = ReturnType<typeof getTodosAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (todoListsState = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoListsState.filter(tl => tl.id !== action.id)
        case CHANGE_TODO_LIST_TITLE:
            return todoListsState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case ADD_NEW_TODOLIST:
            const newTodolist: TodoListDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...todoListsState]
        case CHANGE_TODOLIST_FILTER:
            return todoListsState.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case CHANGE_TODOLIST_ENTITY_STATUS:
            return todoListsState.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case GET_TODOLIST:
            return action.todos.map((t) => {
                return {...t, filter: 'all', entityStatus: 'idle'}
            })
        default:
            return todoListsState
    }
}

export const removeTodoListAC = (todolistID: string): RemoveTodoListAT => {
    return {type: REMOVE_TODOLIST, id: todolistID}
}
export const updateTodoListTitleAC = (id: string, title: string): ChangeTodoListAT => {
    return {type: CHANGE_TODO_LIST_TITLE, id: id, title: title}
}
export const createTodolistAC = (todolist: TodoListType): AddTodoListAT => {
    return {type: ADD_NEW_TODOLIST, todolist}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilter => {
    return {type: CHANGE_TODOLIST_FILTER, id, filter}
}

export const getTodosAC = (todos: Array<TodoListType>) => {
    return {type: GET_TODOLIST, todos} as const
}

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: CHANGE_TODOLIST_ENTITY_STATUS, id, entityStatus,} as const
}

export const getTodosTC = () => (dispatch: Dispatch<ActionType>): void => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(getTodosAC(res.data))
            dispatch(setAppStateAC('succeeded'))
        })
}
export const removeTodoListTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStateAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistsAPI.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(id))
                dispatch(setAppStateAC('succeeded'))

            } else {
                handleServerAppError(dispatch, res.data)
            }
            dispatch(setAppStateAC('succeeded'))
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(createTodolistAC(res.data.data.item))
                dispatch(setAppStateAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const updateTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStateAC('loading'))
    todolistsAPI.updateTodolistTitle(title, id)
        .then((res) => {
            dispatch(updateTodoListTitleAC(id, title))
            dispatch(setAppStateAC('succeeded'))
        })

}