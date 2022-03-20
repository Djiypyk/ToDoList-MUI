import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>


const Template: ComponentStory<typeof App> = (args) => <App/>

export const AppBaseExample = Template.bind({});
AppBaseExample.args = {};
