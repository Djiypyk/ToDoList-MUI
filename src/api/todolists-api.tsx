import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '7b609e77-8b87-49b1-abc2-87ddc192ab78'
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        return axiosInstance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return axiosInstance.post<ResponseType<{ item: TodolistType }>>('todo-lists',
            {title: title})
    },
    deleteTodolist(id: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(todolistTitle: string, todolistId: string) {
        return axiosInstance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title: todolistTitle})
    },
    getTasks(todolistId: string) {
        return axiosInstance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return axiosInstance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, taskTitle: string) {
        return axiosInstance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
}