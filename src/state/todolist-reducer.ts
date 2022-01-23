import {TodoListType} from "../App";

type ActionType = any
type todoListReduceType = {
    type: string
    id: string
}

export const todolistReducerTest = (todoLists: Array<TodoListType>, action: todoListReduceType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

        default:
            return todoLists

    }
}