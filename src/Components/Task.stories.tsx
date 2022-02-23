import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";

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
    task: {id: '1', isDone: true, title: 'JS'},
    todoListID: '1',
};

export const TaskNotDoneExample = Template.bind({});
TaskNotDoneExample.args = {
    task: {id: '1', isDone: false, title: 'JS'},
    todoListID: '2',
};