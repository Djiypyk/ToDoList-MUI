import {todolistsAPI, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStateAC, SetErrorAT, SetStatusAT} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (todoListsState = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoListsState.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return todoListsState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'ADD-NEW-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...todoListsState]
        case 'CHANGE-TODOLIST-FILTER':
            return todoListsState.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return todoListsState.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'GET_TODOLIST':
            return action.todos.map((t) => {
                return {...t, filter: 'all', entityStatus: 'idle'}
            })
        default:
            return todoListsState
    }
}


//Action Creator

export const removeTodoListAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', id: todolistID} as const)
export const updateTodoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const createTodolistAC = (todolist: TodoListType) => ({type: 'ADD-NEW-TODOLIST', todolist}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const getTodosAC = (todos: Array<TodoListType>) => ({type: 'GET_TODOLIST', todos} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

// Thunk

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

// Types

export type ActionType =
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof getTodosAC>
    | SetStatusAT
    | SetErrorAT
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}