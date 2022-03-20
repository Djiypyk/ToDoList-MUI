import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action('Task should be removed'),
        changeTaskStatus: action('Checkbox should be changed'),
        changeTasksTitle: action('Task title should be changed')
    }
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {
        id: '1', status: TaskStatuses.Completed, title: 'JS', addedDate: '', todoListId: 'todoListID_1', startDate: '',
        deadline: '', order: 0, description: '',
        priority: TaskPriorities.Hi, completed: true
    },
    todoListID: '1',
};

export const TaskNotDoneExample = Template.bind({});
TaskNotDoneExample.args = {
    task: {
        id: '1', status: TaskStatuses.New, title: 'JS', addedDate: '', todoListId: 'todoListID_1', startDate: '',
        deadline: '', order: 0, description: '',
        priority: TaskPriorities.Hi, completed: true
    },
    todoListID: '2',
};