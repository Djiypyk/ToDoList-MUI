import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    createTodoListTC,
    FilterValuesType,
    getTodosTC,
    removeTodoListTC,
    TodoListDomainType
} from "./store/todolist-reducer";
import {changeTaskTitleAC, createTasksTC, removeTasksTC, updateTasksStatusTC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "./App";
import {TaskStatuses} from "./api/todolists-api";


//C-R-U-D
function AppWithRedux() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch])
    //BLL:
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


//tasks:
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTasksTC(taskID, todoListID))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(createTasksTC(title, todoListID))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTasksStatusTC(taskID, status, todoListID))
    }, [dispatch])


    const changeTasksTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

//todoLists:
    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListTC(todoListID)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    const todoListJSX = todoLists.map(tl => {
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
                            tasks={tasks[tl.id]}
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
                        <Typography variant="h6">
                            News
                        </Typography>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} justifyContent={"center"}>
                    {todoListJSX}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;


