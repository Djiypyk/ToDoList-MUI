import axios, {AxiosResponse} from "axios";
import {TodoListDomainType} from "../store/todolist-reducer";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '7b609e77-8b87-49b1-abc2-87ddc192ab78'
    }
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: null | string
}

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        return axiosInstance.get<TodoListType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return axiosInstance.post<{ title: string },
            AxiosResponse<ResponseType<{ item: TodoListDomainType }>>>('todo-lists',
            {title})
    },
    deleteTodolist(id: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(title: string, id: string) {
        return axiosInstance.put<{ title: string },
            AxiosResponse<ResponseType>>(`todo-lists/${id}`,
            {title})
    },
    getTasks(todolistId: string) {
        return axiosInstance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return axiosInstance.put<UpdateTaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, taskTitle: string) {
        return axiosInstance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
}