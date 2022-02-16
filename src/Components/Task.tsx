import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

export type TaskPropsType = {
    todoListID: string
    task: TaskType
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTasksTitle: (taskID: string, title: string, todoListID: string) => void
}

export const Task = React.memo(({
                                    task,
                                    todoListID,
                                    removeTask,
                                    changeTaskStatus,
                                    changeTasksTitle
                                }: TaskPropsType) => {
    const onRemoveTask = useCallback(() => removeTask(task.id, todoListID), [removeTask, task.id, todoListID])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(task.id, e.currentTarget.checked, todoListID), [task.id, todoListID, changeTaskStatus])

    const changeTaskTitle = useCallback((newTitle: string) => {
        changeTasksTitle(task.id, newTitle, todoListID)
    }, [changeTasksTitle, todoListID, task.id])

    return <ListItem key={task.id} divider
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