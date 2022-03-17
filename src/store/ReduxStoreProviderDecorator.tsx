import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0,},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 1,}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(),
                title: "JS/TS",
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Hi,
                completed: false
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Meat", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "Beer", status: TaskStatuses.New,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }
        ]
    },
    app: {status: 'idle' , error: null}
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>

}