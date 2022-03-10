import {addTaskAC, updateTaskStatusAC, updateTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {createTodolistAC} from "./todolist-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: '1', title: "HTML", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: '2', title: "CSS", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: '3',
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
        "todolistId2": [
            {
                id: '1', title: "Meat", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: '2', title: "Milk", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: '3', title: "Beer", status: TaskStatuses.New,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "HTML", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: "2", title: "CSS", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: "3", title: "JS/TS", status: TaskStatuses.New,
                addedDate: '', todoListId: 'todolistId1', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "Meat", status: TaskStatuses.Completed,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: true
            },
            {
                id: "3", title: "Beer", status: TaskStatuses.New,
                addedDate: '', todoListId: 'todolistId2', startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }
        ]
    });

});


test('correct task should be added to correct array', () => {

    // const action = addTaskAC("juice", "todolistId2");
    const action = addTaskAC({
        title: "juice",
        todoListId: "todolistId2",
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: '',
        completed: true
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(0);
})


test('status of specified task should be changed', () => {

    const action = updateTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].id).toBe('2');
    expect(endState['todolistId2'][1].status).toBe(0);
    expect(endState['todolistId1'][1].status).toBe(2);
});

test('title task should be changed', () => {


    const action = updateTaskTitleAC("2", 'TS', "todolistId1");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('TS')


})

test('new array should be added when new todolist is added', () => {

    const action = createTodolistAC({
        id: 'asdasd',
        title: 'new todolist',
        addedDate: '',
        order: 0
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


