import React, {useState} from 'react';
import './App.css';
import TodoList from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {FilterValuesType, TodoListDomainType} from "./store/todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [id: string]: Array<TaskType>
}


//C-R-U-D
function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
    ])

    const [tasks, setTasks] = useState<TasksStateType>(
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
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: [{
                id: v1(), title, status: TaskStatuses.New,
                addedDate: '', todoListId: todoListID, startDate: '',
                deadline: '', order: 0, description: '',
                priority: TaskPriorities.Hi, completed: false
            }, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, status} : t)})
    }
    const changeTasksTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)})
    }

//todolists:
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title} : t))
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        setTodoLists([...todoLists, {id: newTodoListID, title, filter: 'all', addedDate: '', order: 0}])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl));
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

export default App;