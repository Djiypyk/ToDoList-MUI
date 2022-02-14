import React, {ChangeEvent} from 'react';
import {TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton, List, ListItem, Typography} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import {AppRootStateType} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {TodoListType} from "../AppWithRedux";
import {changeTodolistFilterAC, changeTodoListTitleAC, removeTodoListAC} from "../store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";

type TodoListPropsType = {
    id: string
}

const TodoList1 = (props: TodoListPropsType) => {
    const dispatch = useDispatch()
    const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists
        .filter(todo => todo.id === props.id)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    if (todolist.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const onClickSetAllFilter = () => dispatch(changeTodolistFilterAC(props.id, "all"))
    const onClickSetActiveFilter = () => dispatch(changeTodolistFilterAC(props.id, "active"))
    const onClickSetCompletedFilter = () => dispatch(changeTodolistFilterAC(props.id, "completed"))

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id));
    }
    const removeTodoList = () => dispatch(removeTodoListAC(props.id))
    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(title, props.id))
    }

    return (
        <Grid container direction={"column"}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '400px',
                position: 'relative'
            }}>
                <Grid item>
                    <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
                        <EditableSpan title={todolist.title} changeTitle={changeTodoListTitle}/>
                        <IconButton onClick={removeTodoList} color={'primary'}
                                    size={'small'}>
                            <DeleteForeverOutlinedIcon/>
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item>
                    <AddItemForm addItem={addTask}/>
                    <List style={{textAlign: 'center'}}>
                        {tasks.map(t => {
                            const removeTask = () => dispatch(removeTaskAC(t.id, props.id))
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                                dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                            const onTitleChangeHandler = (newTitle: string) => {
                                dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
                            }

                            return (
                                <ListItem key={t.id} divider
                                          style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Checkbox
                                        checked={t.isDone}
                                        onChange={changeStatus}
                                    />
                                    <EditableSpan title={t.title} changeTitle={onTitleChangeHandler}/>
                                    <IconButton onClick={removeTask}>
                                        <DeleteForeverOutlinedIcon color={'primary'}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
                <div>
                    <ButtonGroup size={'small'} variant={'contained'} disableElevation
                                 fullWidth style={{position: 'absolute', bottom: '0'}}
                    >
                        <Button
                            color={todolist.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={onClickSetAllFilter}
                        >All
                        </Button>
                        <Button
                            color={todolist.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onClickSetActiveFilter}
                        >Active
                        </Button>
                        <Button
                            color={todolist.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onClickSetCompletedFilter}
                        >Completed
                        </Button>
                    </ButtonGroup>
                </div>

            </div>
        </Grid>

    )
}

export default TodoList1;