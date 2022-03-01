import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
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

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}
export const todolistsAPI = {
    GetTodolists() {
        return axiosInstance.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists')
    },
    CreateTodolist(title: string) {
        return axiosInstance.post<ResponseType<{ item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: title})
    },
    DeleteTodolist(id: string) {
        return axiosInstance.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`)
    },
    UpdateTodolistTitle(todolistTitle: string, todolistId: string) {
        return axiosInstance.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title: todolistTitle})
    }
}