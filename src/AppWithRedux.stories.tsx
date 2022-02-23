import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>

export const AppWithReduxBaseExample = Template.bind({});
AppWithReduxBaseExample.args = {};
