import {v1} from 'uuid';
import {
    ActionType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    TodoListDomainType,
    todolistsReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListDomainType>


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",  addedDate: '', order: 1}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";


    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, changeTodoListTitleAC(action.id, action.title));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = "completed";


    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, changeTodolistFilterAC(action.id, action.filter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


