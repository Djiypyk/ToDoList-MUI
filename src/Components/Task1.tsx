import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";

export type TaskPropsType = {
    todoListID: string
    taskId: string
}

export const Task1 = React.memo(({todoListID,taskId}: TaskPropsType) => {
    const dispatch = useDispatch()

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListID].filter(t => t.id === taskId)[0])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC(taskId, newTaskStatus, todoListID))
    },[dispatch,taskId,todoListID])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    } , [dispatch, todoListID, taskId])

    const onRemoveTask = useCallback(() => {
        dispatch(removeTaskAC(taskId, todoListID))
    }, [dispatch, taskId, todoListID])

    return <ListItem key={taskId} divider
                     style={{display: 'flex', justifyContent: 'space-between'}}>
        <Checkbox
            checked={task.isDone}
            onChange={changeStatus}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        <IconButton onClick={onRemoveTask}>
            <DeleteForeverOutlinedIcon color={'primary'}/>
        </IconButton>
    </ListItem>
})