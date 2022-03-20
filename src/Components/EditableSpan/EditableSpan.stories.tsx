import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Components/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            defaultValue: 'some text',
            description: 'string'
        },
        changeTitle: {
            description: 'Span will changed'
        },
        args: {
            changeTitle: action('Span will changed'),
            title: 'New String'
        }
    },
} as ComponentMeta<typeof EditableSpan>


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanWithStartValue = Template.bind({});
EditableSpanWithStartValue.args = {};

export const EditableSpanWithOutStartValue = Template.bind({});
EditableSpanWithOutStartValue.args = {
    title: ''
};