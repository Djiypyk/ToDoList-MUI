import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": '7b609e77-8b87-49b1-abc2-87ddc192ab78'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', setting)
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Nick todolist'}, setting)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/dc2cc83a-bd97-4421-bcac-63435a926a2b', setting)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/ae208116-b3bd-4f52-86c7-565ae985fdf7', {title: 'Nick Hello'}, setting)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
