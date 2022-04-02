import {TasksStateType} from "../../trash/App";
import {createTodolistAC, getTodosAC, removeTodoListAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../App/store";
import {setAppStateAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todoListID: string }>) {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        updateTaskStatusAC(state, action: PayloadAction<{ taskID: string, status: TaskStatuses, todoListID: string }>) {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        },
        updateTaskTitleAC(state, action: PayloadAction<{ taskID: string, title: string, todoListID: string }>) {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todolistID]
        });
        builder.addCase(getTodosAC, (state, action) => {
            action.payload.todos.forEach((t: any) => state[t.id] = [])
        });
    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC, removeTaskAC, updateTaskStatusAC, updateTaskTitleAC, setTasksAC} = slice.actions

//Thunk

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
            dispatch(setAppStateAC({status: 'succeeded'}))
        })
}

export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC({taskID: taskId, todoListID: todolistId}))
            dispatch(setAppStateAC({status: 'succeeded'}))
        })
}

export const createTasksTC = (title: string, todoIt: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStateAC({status: 'loading'}))
    todolistsAPI.createTask(todoIt, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStateAC({status: 'succeeded'}))
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
    todoListID: string) => (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
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
        dispatch(setAppStateAC({status: 'loading'}))
        todolistsAPI.updateTask(todoListID, taskID, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskStatusAC({taskID, status, todoListID}))
                    dispatch(setAppStateAC({status: 'succeeded'}))
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
    todoListID: string) => (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
    const currentTask = getState().tasks[todoListID].find((t: TaskType) => t.id === taskID)

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
        dispatch(setAppStateAC({status: 'loading'}))
        todolistsAPI.updateTask(todoListID, taskID, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskTitleAC({taskID, title, todoListID}))
                    dispatch(setAppStateAC({status: 'succeeded'}))
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

// export type ActionType =
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof updateTaskStatusAC>
//     | ReturnType<typeof updateTaskTitleAC>
//     | ReturnType<typeof createTodolistAC>
//     | ReturnType<typeof removeTodoListAC>
//     | ReturnType<typeof getTodosAC>
//     | ReturnType<typeof setTasksAC>
//     | ReturnType<typeof setAppStateAC>


//With classic redux

// export const tasksReducer = (state = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case 'SET-TASKS' : {
//             return {...state, [action.todolistId]: action.tasks}
//         }
//         case 'ADD-TASK': {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         }
//         case 'REMOVE-TASK': {
//             return {
//                 ...state, [action.todoListID]: state[action.todoListID]
//                     .filter(t => t.id !== action.taskID)
//             }
//         }
//         case 'UPDATE-TASK-STATUS': {
//             return {
//                 ...state, [action.todoListID]: state[action.todoListID]
//                     .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
//             }
//         }
//         case 'UPDATE-TASK-TITLE': {
//             return {
//                 ...state, [action.todoListID]: state[action.todoListID]
//                     .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
//             }
//         }
//         case createTodolistAC.type: {
//             return {...state, [action.payload.todolist.id]: []}
//         }
//         case getTodosAC.type:
//             const stateCopy = {...state}
//             action.payload.todos.forEach((t: any) => {
//                 stateCopy[t.id] = []
//             })
//             return stateCopy
//         case removeTodoListAC.type: {
//             const copyState = {...state}
//             delete copyState[action.payload.id]
//             return copyState
//         }
//         default:
//             return state
//
//     }
// }
//
// // /Action Creator
//
// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
// export const removeTaskAC = (taskID: string, todoListID: string) => ({type: 'REMOVE-TASK', taskID, todoListID} as const)
// export const updateTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) => ({
//     type: 'UPDATE-TASK-STATUS',
//     taskID,
//     status,
//     todoListID
// } as const)
// export const updateTaskTitleAC = (taskID: string, title: string, todoListID: string) => ({
//     type: 'UPDATE-TASK-TITLE',
//     taskID,
//     title,
//     todoListID
// } as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
//     type: 'SET-TASKS',
//     todolistId,
//     tasks
// } as const)