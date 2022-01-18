import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton, List, ListItem, Typography} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

type TodoListPropsType = {
    title: string
    todoListID: string
    addTask: (title: string, todoListID: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTasksTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        const changeTaskTitle = (newTitle: string) => {
            props.changeTasksTitle(t.id, newTitle, props.todoListID)
        }
        return (
            <ListItem key={t.id} divider
                      style={{display: 'flex', justifyContent: 'space-between'}}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <DeleteForeverOutlinedIcon color={'primary'}/>
                </IconButton>
            </ListItem>
        )
    })

    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return (
        <Grid container direction={"column"}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '400px',
                position: 'relative'
            }}><Grid item>
                <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                    <IconButton onClick={removeTodoList} color={'primary'}
                                size={'small'}><DeleteForeverOutlinedIcon/></IconButton>
                </Typography>
            </Grid>
                <Grid item>
                    <AddItemForm addItem={addTask}/>

                    <List style={{textAlign: 'center'}}>
                        {tasksList}
                    </List>
                </Grid>
                <div>
                    <ButtonGroup size={'small'} variant={'contained'} disableElevation
                                 fullWidth style={{position: 'absolute', bottom: '0'}}
                    >
                        <Button
                            color={props.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={onClickSetAllFilter}
                        >All
                        </Button>
                        <Button
                            color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onClickSetActiveFilter}
                        >Active
                        </Button>
                        <Button
                            color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onClickSetCompletedFilter}
                        >Completed
                        </Button>
                    </ButtonGroup>
                </div>

            </div>
        </Grid>

    )
}

export default TodoList;