import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {RequestStatusType} from "../../App/app-reducer";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div style={{textAlign: 'center'}}>
            <TextField
                error={error}
                variant={'outlined'}
                size={'small'}
                label={'Enter new item'}
                helperText={error && 'Title is required!'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled}>
                <AddBoxIcon
                    color={'primary'}
                />
            </IconButton>
        </div>
    );
})