import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    todolistsReducer
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


//C-R-U-D
function AppWithReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()


    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
            [todoListID_1]: [
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
            [todoListID_2]: [
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
        }
    )

    //BLL:

//tasks:
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, status, todoListID))
    }
    const changeTasksTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

//todolists:
    const removeTodoList = (todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
    }
    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(changeTodolistFilterAC(todoListID, filter))
    }


    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            default:
                return tasks
        }
    }

    const todoListComps = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5}
                       style={{
                           padding: '15px',
                           height: '400px',
                           width: '300px'
                       }}>
                    <div>
                        <TodoList
                            todoListID={tl.id}
                            filter={tl.filter}
                            title={tl.title}
                            tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTasksTitle={changeTasksTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </div>
                </Paper>
            </Grid>)
    })

    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} justifyContent={"center"}>
                    {todoListComps}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;


