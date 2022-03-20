import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Components/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>


const callback = action('Button clicked inside form')

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: callback
};
