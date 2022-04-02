import {todolistsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStateAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = []

export const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todolistID: string }>) {
            state.filter(tl => tl.id !== action.payload.todolistID)
        },
        updateTodoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        },
        createTodolistAC(state, action: PayloadAction<{ todolist: TodoListType }>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        },
        getTodosAC(state, action: PayloadAction<{ todos: Array<TodoListType> }>) {
            return action.payload.todos.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.entityStatus} : tl)
        },
    }
})
export const todolistsReducer = slice.reducer
export const {
    removeTodoListAC,
    updateTodoListTitleAC,
    createTodolistAC,
    changeTodolistFilterAC,
    getTodosAC,
    changeTodolistEntityStatusAC
} = slice.actions

// Thunk

export const getTodosTC = () => (dispatch: Dispatch<any>): void => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(getTodosAC({todos: res.data}))
            dispatch(setAppStateAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const removeTodoListTC = (id: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: id, entityStatus: 'loading'}))
    todolistsAPI.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC({todolistID: id}))
                dispatch(setAppStateAC({status: 'succeeded'}))

            } else {
                handleServerAppError(dispatch, res.data)
            }
            dispatch(setAppStateAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(createTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStateAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const updateTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.updateTodolistTitle(title, id)
        .then((res) => {
            dispatch(updateTodoListTitleAC({id, title}))
            dispatch(setAppStateAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

// Types

// export type ActionType =
//     | ReturnType<typeof createTodolistAC>
//     | ReturnType<typeof removeTodoListAC>
//     | ReturnType<typeof updateTodoListTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | ReturnType<typeof getTodosAC>
//     | ReturnType<typeof setAppStateAC>
//     | ReturnType<typeof setAppErrorAC>
//     | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

////With classic redux

// export const todolistsReducer = (todoListsState = initialState, action: ActionType): Array<TodoListDomainType> => {
//     switch (action.type) {
//         // case 'REMOVE-TODOLIST':
//         //     return todoListsState.filter(tl => tl.id !== action.id)
//         // case 'CHANGE-TODOLIST-TITLE':
//         //     return todoListsState.map(t => t.id === action.id ? {...t, title: action.title} : t)
//         // case 'ADD-NEW-TODOLIST':
//         //     return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...todoListsState]
//         // case 'CHANGE-TODOLIST-FILTER':
//         //     return todoListsState.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         // case 'CHANGE-TODOLIST-ENTITY-STATUS':
//         //     return todoListsState.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//         // case 'GET_TODOLIST':
//         //     return action.todos.map((t) => {
//         //         return {...t, filter: 'all', entityStatus: 'idle'}
//         //     })
//         default:
//             return todoListsState
//     }
// }
//Action Creator
//
// export const removeTodoListAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', id: todolistID} as const)
// export const updateTodoListTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: id,
//     title: title
// } as const)
// export const createTodolistAC = (todolist: TodoListType) => ({type: 'ADD-NEW-TODOLIST', todolist}) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter
// } as const)
// export const getTodosAC = (todos: Array<TodoListType>) => ({type: 'GET_TODOLIST', todos} as const)
// export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS',
//     id,
//     entityStatus
// } as const)
