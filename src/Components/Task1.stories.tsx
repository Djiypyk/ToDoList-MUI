import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task1} from "./Task1";
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/Task1',
    component: Task1,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task1>


const Template: ComponentStory<typeof Task1> = (args) => <Task1 {...args}/>

export const Task1BaseExample = Template.bind({});
Task1BaseExample.args = {
    todoListID: "todolistId1",
    taskId: '11',
};
