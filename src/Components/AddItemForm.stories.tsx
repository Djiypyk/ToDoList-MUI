import React from "react";
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Meta, Story} from "@storybook/react";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    },
} as Meta

const callback = action('Button inside form clicked')

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: callback
};
