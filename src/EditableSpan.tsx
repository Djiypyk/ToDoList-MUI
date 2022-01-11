import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') offEditMode()
    }
    return (editMode
            ? <input
                onKeyPress={onKeyPressOffEditMode}
                onChange={onChangeSetTitle}
                value={title}
                autoFocus
                onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

