import {setAppErrorAC, setAppStateAC} from "../store/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStateAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStateAC('failed'))
    } else {
        dispatch(setAppErrorAC('Some error occured'))
        dispatch(setAppStateAC('failed'))
    }
}
