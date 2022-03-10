import {todolistsAPI, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const CHANGE_TODO_LIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const GET_TODOLIST = 'GET_TODOLIST'

export type ActionType = AddTodoListAT
    | RemoveTodoListAT
    | ChangeTodoListAT
    | ChangeTodoListFilter
    | GetTodolistAT


export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
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

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (todoListsState = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoListsState.filter(tl => tl.id !== action.id)
        case CHANGE_TODO_LIST_TITLE:
            return todoListsState.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case ADD_NEW_TODOLIST:
            const newTodolist: TodoListDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...todoListsState]

        case CHANGE_TODOLIST_FILTER:
            return todoListsState.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case GET_TODOLIST:
            return action.todos.map((t) => {
                return {...t, filter: 'all'}
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

export const getTodosTC = () => (dispatch: Dispatch): void => {
    todolistsAPI.getTodolists()
        .then(res => {
            return dispatch(getTodosAC(res.data))
        })
}
export const removeTodoListTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodoListAC(id))
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(createTodolistAC(res.data.data.item))
        })
}

export const updateTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(title, id)
        .then((res) => {
            dispatch(updateTodoListTitleAC(id, title))
        })

}