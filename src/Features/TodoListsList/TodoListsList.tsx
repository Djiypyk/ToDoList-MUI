import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodolistFilterAC, createTodoListTC,
    FilterValuesType,
    getTodosTC,
    removeTodoListTC,
    TodoListDomainType,
    updateTodoListTitleTC
} from "./todolist-reducer";
import {AppRootStateType, useAppSelector} from "../../App/store";
import {TasksStateType} from "../../trash/App";
import {createTasksTC, removeTasksTC, updateTasksStatusTC, updateTasksTitleTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import TodoList from "./TodoList/Todolist";
import {Navigate} from "react-router-dom";

export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {
    //BLL:
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(getTodosTC())
    }, [dispatch, demo, isLoggedIn])

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
        dispatch(updateTasksTitleTC(taskID, title, todoListID))
        dispatch(updateTasksTitleTC(taskID, title, todoListID))
    }, [dispatch])

//todoLists:
    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListTC(todoListID)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(updateTodoListTitleTC(title, todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC({id: todoListID, filter:filter}))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn) return <Navigate to={'login'}/>

    return <>
        <Grid container justifyContent={"center"} style={{padding: '15px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4} justifyContent={"center"}>
            {todoLists.map(tl => {
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
                                    entityStatus={tl.entityStatus}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTodoListFilter={changeTodoListFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTasksTitle={changeTasksTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </div>
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
}
//Types
type PropsType = {
    demo?: boolean
}
