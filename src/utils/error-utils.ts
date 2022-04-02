import {setAppErrorAC, setAppStateAC} from "../App/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<any>, message: string) => {
    dispatch(setAppErrorAC({error: message}))
    dispatch(setAppStateAC({status: 'failed'}))
}

export const handleServerAppError = <T>(dispatch: Dispatch<any>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
        dispatch(setAppStateAC({status: 'failed'}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occured'}))
        dispatch(setAppStateAC({status: 'failed'}))
    }
}

// type ErrorUtilsDispatchType = SetStatusAT | SetErrorAT