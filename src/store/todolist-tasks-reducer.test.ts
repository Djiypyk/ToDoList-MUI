import {TasksStateType} from "../App";
import {addTodolistAC, removeTodoListAC, TodoListDomainType, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";
//
// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodoListDomainType> = [];
//
//     const action = addTodolistAC("new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.id);
//     expect(idFromTodolists).toBe(action.id);
// });


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1":[
            {
                id: v1(), title: "HTML", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todoListID_1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todoListID_1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(),
                title: "JS/TS",
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: 'todoListID_1',
                startDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Hi,
                completed: false
            }
        ],
        "todolistId2": [
            {
                id: v1(), title: "Meat", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todoListID_2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todoListID_2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: v1(), title: "Beer", status: TaskStatuses.New,
                addedDate: '', todoListId: 'todoListID_2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }
        ]
    };

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
